package com.swugether.server.domain.Post.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.ArrayList;

@Getter
@AllArgsConstructor
public class PostListDto {
    private ArrayList<PostItemDto> list;
}
