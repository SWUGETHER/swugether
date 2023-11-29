package com.swugether.server.domain.Auth.dto;

import com.swugether.server.domain.Auth.domain.UserEntity;
import com.swugether.server.domain.model.TokenEnum;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
public class RefreshTokenResponseDto {
    private long user_id;
    private String access_token;
    private String refresh_token;

    public RefreshTokenResponseDto(UserEntity user, Map<String, Object> tokens) {
        this.user_id = user.getId();
        this.access_token = (String) tokens.get(TokenEnum.ACCESS_TOKEN.getKey());
    }
}
