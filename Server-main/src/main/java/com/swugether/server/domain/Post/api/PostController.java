package com.swugether.server.domain.Post.api;

import com.swugether.server.domain.Post.application.PostService;
import com.swugether.server.domain.Post.dto.*;
import com.swugether.server.global.base.dto.DataResponseDto;
import com.swugether.server.global.base.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;
import java.net.URI;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/post")
public class PostController {
    private final PostService postService;

    // 게시글 목록 조회
    @GetMapping
    public ResponseEntity<ResponseDto> list(@RequestHeader("Authorization") String bearer_token,
                                            @RequestParam String order) {

        PostListDto postListDto = postService.listService(bearer_token, order);

        return ResponseEntity.ok(DataResponseDto.of(postListDto));

    }

    // 게시글 세부 조회
    @GetMapping("/detail/{postId}")
    public ResponseEntity<ResponseDto> detail(@PathVariable Long postId,
                                              @RequestHeader("Authorization") String bearer_token) {
        PostDto postDto = postService.detailService(bearer_token, postId);

        return ResponseEntity.ok(DataResponseDto.of(postDto));
    }

    // 게시글 작성
    @PostMapping
    public ResponseEntity<ResponseDto> add(@RequestHeader("Authorization") String bearer_token,
                                           @RequestBody @Valid NewPostRequestDto newPostRequestDto) throws IOException {
        SavedPostDto savedPostDto = postService.addService(bearer_token, newPostRequestDto);

        return ResponseEntity.created(URI.create("/post/detail/" + savedPostDto.getPost_id())).body(DataResponseDto.of(savedPostDto, 201));
    }

    // 게시글 수정
    @PatchMapping("/{postId}")
    public ResponseEntity<ResponseDto> update(@PathVariable Long postId,
                                              @RequestHeader("Authorization") String bearer_token,
                                              @RequestBody @Valid EditPostRequestDto editPostRequestDto) throws IOException {

        SavedPostDto savedPostDto = postService.updateService(bearer_token, postId, editPostRequestDto);

        return ResponseEntity.created(URI.create("/post/detail/" + savedPostDto.getPost_id())).body(DataResponseDto.of(savedPostDto, 201));
    }

    // 게시글 삭제
    @DeleteMapping("/{postId}")
    public ResponseEntity<ResponseDto> delete(@PathVariable Long postId,
                                              @RequestHeader("Authorization") String bearer_token) {
        postService.deleteService(bearer_token, postId);

        return ResponseEntity.ok(ResponseDto.of(200));
    }

    // 게시글 좋아요 설정 및 취소
    @PostMapping("/like/{postId}")
    public ResponseEntity<ResponseDto> like(@PathVariable Long postId,
                                            @RequestHeader("Authorization") String bearer_token) {
        PostLikeResponseDto postLikeResponseDto = postService.likeService(bearer_token, postId);

        return ResponseEntity.status(201).body(DataResponseDto.of(postLikeResponseDto, 201));
    }

    // 좋아요한 게시글 목록 조회
    @GetMapping("/like")
    public ResponseEntity<ResponseDto> likeList(@RequestHeader("Authorization") String bearer_token) {
        PostListDto postListDto = postService.likeListService(bearer_token);

        return ResponseEntity.ok(DataResponseDto.of(postListDto));
    }
}
