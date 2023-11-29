package com.swugether.server.domain.Post.application;

import com.swugether.server.domain.Auth.domain.UserEntity;
import com.swugether.server.domain.Post.domain.*;
import com.swugether.server.domain.Post.dto.*;
import com.swugether.server.domain.Post.exception.PostErrorCode;
import com.swugether.server.global.exception.AuthorizationException;
import com.swugether.server.global.exception.GlobalException;
import com.swugether.server.global.util.ValidateToken;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Slf4j
@Service
public class PostService {
    private final ValidateToken validateToken;
    private final ContentRepository contentRepository;
    private final ImageRepository imageRepository;
    private final LikedRepository likedRepository;

    @Value("${FILE_UPLOAD_BASE_PATH}")
    private String ImagePath;

    // 이미지 저장
    public ArrayList<ImageDto> saveImages(ContentEntity post, ArrayList<MultipartFile> images) throws IOException {
        ArrayList<ImageDto> result = new ArrayList<>();

        for (MultipartFile file : images) {
            ImageEntity image = new ImageEntity(post, null);
            Long image_id = imageRepository.save(image).getId();
            String file_name = image_id + "_" + file.getOriginalFilename();
            String file_path = "/" + post.getId() + "_" + file_name;

            file.transferTo(new File(ImagePath + file_path));

            image.updateImagePath(file_path);

            result.add(new ImageDto(image_id, file_path));
        }

        return result;
    }

    // 이미지 삭제
    public void deleteImages(ContentEntity post) throws GlobalException {
        List<ImageDto> images = imageRepository.findAllByPost(post);

        for (ImageDto image : images) {
            // 파일 삭제
            File file = new File(ImagePath + image.getImage_path());

            // 파일 존재 여부 검사
            if (!file.exists())
                throw new GlobalException(PostErrorCode.FILE_NOT_FOUND);

            // 파일 삭제
            if (file.delete()) {
                log.info("File deleted: " + image.getImage_path());
            } else {
                log.error("File deletion failed: " + image.getImage_path());

                throw new GlobalException(PostErrorCode.FILE_DELETION_FAILED, PostErrorCode.FILE_DELETION_FAILED.getMessage() + image.getImage_path());
            }

            // 데이터 삭제
            imageRepository.deleteById(image.getImage_id());
        }
    }

    // 게시글 목록 조회
    public PostListDto listService(String authorization, String order) throws GlobalException, AuthorizationException {
        List<ContentEntity> contents;
        ArrayList<PostItemDto> result = new ArrayList<>();

        // 토큰 유효성 검사 및 유저 정보 추출
        UserEntity user = validateToken.validateAuthorization(authorization);

        // 게시글 데이터 조회
        contents = switch (order) {
            case "recent" -> contentRepository.findAllByOrderByCreatedAtDesc();
            case "oldest" -> contentRepository.findAllByOrderByCreatedAtAsc();
            case "like" -> contentRepository.findAllByOrderByLikeCountDesc();
            default ->
                    throw new GlobalException(PostErrorCode.INVALID_VALUE, PostErrorCode.INVALID_VALUE.getMessage() + order);
        };

        // 데이터 정제
        for (ContentEntity post : contents) {
            PostItemDto dto = PostItemDto.builder()
                    .content(post)
                    .is_liked(likedRepository.existsByUserAndPost(user, post))
                    .thumbnail_image_path(imageRepository.findTopByPostOrderByIdAsc(post).getImagePath())
                    .build();
            result.add(dto);
        }

        return new PostListDto(result);
    }

    // 좋아요한 게시글 목록 조회
    public PostListDto likeListService(String authorization) throws GlobalException, AuthorizationException {
        // 토큰 유효성 검사 및 유저 정보 추출
        UserEntity user = validateToken.validateAuthorization(authorization);

        // 게시글 데이터 조회
        List<LikedEntity> likes = likedRepository.findAllByUser(user);
        List<ContentEntity> contents = new ArrayList<>();

        for (LikedEntity liked : likes) {
            contents.add(liked.getPost());
        }

        // 데이터 정제
        ArrayList<PostItemDto> result = new ArrayList<>();
        for (ContentEntity post : contents) {
            PostItemDto dto = PostItemDto.builder()
                    .content(post)
                    .is_liked(likedRepository.existsByUserAndPost(user, post))
                    .thumbnail_image_path(imageRepository.findTopByPostOrderByIdAsc(post).getImagePath())
                    .build();
            result.add(dto);
        }

        return new PostListDto(result);
    }

    // 게시글 세부 조회
    public PostDto detailService(String authorization, Long postId) throws GlobalException, AuthorizationException {
        // 토큰 유효성 검사 및 유저 정보 추출
        UserEntity user = validateToken.validateAuthorization(authorization);

        // 게시글 유효성 검사
        ContentEntity post = contentRepository.findById(postId)
                .orElseThrow(() -> new GlobalException(PostErrorCode.POST_NOT_FOUND));

        return PostDto.builder()
                .content(post)
                .images(imageRepository.findAllByPost(post))
                .is_liked(likedRepository.existsByUserAndPost(user, post))
                .build();
    }

    // 게시글 작성
    @Transactional
    public SavedPostDto addService(String authorization, NewPostRequestDto newPostRequestDto) throws GlobalException, AuthorizationException, IOException {
        // 토큰 유효성 검사 및 유저 정보 추출
        UserEntity user = validateToken.validateAuthorization(authorization);

        // 게시글 데이터 저장
        ContentEntity post = contentRepository.save(newPostRequestDto.toEntity(user));

        // 이미지 데이터 저장
        ArrayList<ImageDto> images = saveImages(post, newPostRequestDto.getImages());

        // dto
        return SavedPostDto.builder()
                .content(post)
                .images(images)
                .build();
    }

    // 게시글 수정
    public SavedPostDto updateService(String authorization, Long postId, EditPostRequestDto editPostRequestDto) throws GlobalException, AuthorizationException, IOException {
        // 토큰 유효성 검사 및 유저 정보 추출
        UserEntity user = validateToken.validateAuthorization(authorization);

        // 게시글 조회
        ContentEntity post = contentRepository.findById(postId)
                .orElseThrow(() -> new GlobalException(PostErrorCode.POST_NOT_FOUND));

        // 게시글 작성자 검사
        if (!post.getUser().equals(user))
            throw new GlobalException(PostErrorCode.POST_ACCESS_DENIED);

        // 데이터 업데이트
        ArrayList<ImageDto> images = new ArrayList<>();

        post.updatePost(editPostRequestDto.getTitle(), editPostRequestDto.getContent());

        // 이미지 데이터 수정
        deleteImages(post);

        // 이미지 데이터 저장
        if (editPostRequestDto.getImages() != null)
            images = saveImages(post, editPostRequestDto.getImages());

        return SavedPostDto.builder()
                .content(post)
                .images(images)
                .build();
    }

    // 게시글 삭제
    public void deleteService(String authorization, Long postId) throws GlobalException, AuthorizationException {
        // 토큰 유효성 검사 및 유저 정보 추출
        UserEntity user = validateToken.validateAuthorization(authorization);

        // 게시글 조회
        ContentEntity post = contentRepository.findById(postId)
                .orElseThrow(() -> new GlobalException(PostErrorCode.POST_NOT_FOUND));

        // 게시글 작성자 확인
        if (!user.equals(post.getUser()))
            throw new GlobalException(PostErrorCode.POST_ACCESS_DENIED);

        // 이미지 삭제
        deleteImages(post);

        // 게시글 삭제
        contentRepository.deleteById(postId);
    }

    // 게시글 좋아요 관리
    @Transactional
    public PostLikeResponseDto likeService(String authorization, Long postId) throws GlobalException, AuthorizationException {
        // 토큰 유효성 검사 및 유저 정보 추출
        UserEntity user = validateToken.validateAuthorization(authorization);

        // 게시글 조회
        ContentEntity post = contentRepository.findById(postId)
                .orElseThrow(() -> new GlobalException(PostErrorCode.POST_NOT_FOUND));

        // 좋아요 정보 조회
        LikedEntity likedEntity = likedRepository.findByUserAndPost(user, post).orElse(null);

        boolean isLiked = true;
        if (likedEntity == null) {
            // 좋아요 설정
            likedRepository.save(new LikedEntity(user, post));

            // 좋아요 수 수정
            post.updateLikeCount(post.getLikeCount() + 1);
        } else {
            // 좋아요 취소
            likedRepository.delete(likedEntity);

            // 좋아요 수 수정
            post.updateLikeCount(post.getLikeCount() - 1);

            isLiked = false;
        }

        return new PostLikeResponseDto(postId, isLiked);
    }
}
