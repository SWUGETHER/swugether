package com.swugether.server.global.util;

import com.swugether.server.domain.Auth.domain.RefreshTokenRepository;
import com.swugether.server.domain.Auth.domain.UserEntity;
import com.swugether.server.domain.Auth.domain.UserRepository;
import com.swugether.server.global.base.constant.GlobalErrorCode;
import com.swugether.server.global.exception.AuthorizationException;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.InvalidClaimException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Map;

@RequiredArgsConstructor
@Component
public class ValidateToken {
    private final JwtProvider jwtProvider;
    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;

    public UserEntity validateAuthorization(String authorization) throws AuthorizationException {
        Map<String, Object> payload;
        Long userId;

        // 헤더에서 token 추출
        String accessToken = authorization.split("Bearer ")[1];

        try {
            // 토큰 유효성 검사 및 유저 정보 추출
            payload = jwtProvider.verifyJWT(accessToken);
            userId = ((Number) payload.get("userId")).longValue();
        } catch (InvalidClaimException e) {
            throw new AuthorizationException(GlobalErrorCode.INVALID_TOKEN);
        } catch (ExpiredJwtException e) {
            throw new AuthorizationException(GlobalErrorCode.EXPIRED_JWT);
        }

        // 유저 존재 여부 검사
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new AuthorizationException(GlobalErrorCode.USER_NOT_FOUND));

        // 로그인 여부 검사
        if (!refreshTokenRepository.existsById(userId))
            throw new AuthorizationException(GlobalErrorCode.LOGIN_REQUIRED);

        return user;
    }
}
