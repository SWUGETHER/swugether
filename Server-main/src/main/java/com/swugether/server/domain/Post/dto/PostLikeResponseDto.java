package com.swugether.server.domain.Post.dto;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class PostLikeResponseDto {
    private long post_id;
    private boolean is_liked;
}
