package com.swugether.server.domain.Auth.domain;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@RedisHash(value = "refreshToken", timeToLive = 604800)
public class RefreshTokenEntity {
    @Id
    private final Long userId;
    private final String refreshToken;

    @Builder
    public RefreshTokenEntity(final Long userId, final String refreshToken) {
        this.userId = userId;
        this.refreshToken = refreshToken;
    }
}
