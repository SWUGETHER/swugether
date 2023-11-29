package com.swugether.server.domain.Auth.dto;

import com.swugether.server.domain.Auth.domain.UserEntity;
import com.swugether.server.domain.model.TokenEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Map;

@AllArgsConstructor
@Getter
public class NewUserResponseDto {
    private long user_id;
    private boolean is_admin;
    private String access_token;
    private String refresh_token;

    public NewUserResponseDto(UserEntity user, Map<String, Object> tokens) {
        this.user_id = user.getId();
        this.is_admin = user.getIsAdmin();
        this.access_token = (String) tokens.get(TokenEnum.ACCESS_TOKEN.getKey());
    }
}
