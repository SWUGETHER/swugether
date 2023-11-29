package com.swugether.server.domain.model;

import lombok.Getter;

@Getter
public enum TokenEnum {
    ACCESS_TOKEN("accessToken"),
    REFRESH_TOKEN("refreshToken");

    private final String key;

    TokenEnum(String key) {
        this.key = key;
    }
}
