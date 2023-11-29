package com.swugether.server.domain.MyPage.application;

import com.swugether.server.domain.Auth.domain.UserEntity;
import com.swugether.server.domain.MyPage.dto.MyPostItemDto;
import com.swugether.server.domain.MyPage.dto.MyPostListDto;
import com.swugether.server.domain.Post.domain.ContentEntity;
import com.swugether.server.domain.Post.domain.ContentRepository;
import com.swugether.server.domain.Post.domain.ImageRepository;
import com.swugether.server.domain.Post.domain.LikedRepository;
import com.swugether.server.global.exception.AuthorizationException;
import com.swugether.server.global.exception.GlobalException;
import com.swugether.server.global.util.ValidateToken;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class MypageService {
    private final ValidateToken validateToken;
    private final ContentRepository contentRepository;
    private final LikedRepository likedRepository;
    private final ImageRepository imageRepository;

    // 내가 쓴 글 목록 조회
    public MyPostListDto listService(String authorization) throws GlobalException, AuthorizationException {
        ArrayList<MyPostItemDto> result = new ArrayList<>();

        // 토큰 유효성 검사 및 유저 정보 추출
        UserEntity user = validateToken.validateAuthorization(authorization);

        // 게시글 데이터 조회
        List<ContentEntity> contents = contentRepository.findAllByUserOrderByCreatedAtDesc(user);

        // 데이터 정제
        for (ContentEntity post : contents) {
            MyPostItemDto dto = MyPostItemDto.builder()
                    .content(post)
                    .is_liked(likedRepository.existsByUserAndPost(user, post))
                    .thumbnail_image_path(imageRepository.findTopByPostOrderByIdAsc(post).getImagePath())
                    .build();
            result.add(dto);
        }

        return new MyPostListDto(result);
    }
}
