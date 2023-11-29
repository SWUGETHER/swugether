package com.swugether.server.domain.MyPage.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.ArrayList;

@AllArgsConstructor
@Getter
public class MyPostListDto {
    private ArrayList<MyPostItemDto> list;
}
