package com.swugether.server.domain.Auth.application;

import com.swugether.server.domain.Auth.domain.RefreshTokenEntity;
import com.swugether.server.domain.Auth.domain.RefreshTokenRepository;
import com.swugether.server.domain.Auth.domain.UserEntity;
import com.swugether.server.domain.Auth.domain.UserRepository;
import com.swugether.server.domain.Auth.dto.NewUserResponseDto;
import com.swugether.server.domain.Auth.dto.RefreshTokenResponseDto;
import com.swugether.server.domain.Auth.exception.AuthErrorCode;
import com.swugether.server.global.base.constant.GlobalErrorCode;
import com.swugether.server.global.exception.AuthorizationException;
import com.swugether.server.global.exception.GlobalException;
import com.swugether.server.global.util.GoogleOAuth;
import com.swugether.server.global.util.JwtProvider;
import com.swugether.server.global.util.ValidateToken;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Service
public class AuthService {
    private final GoogleOAuth googleOAuth;
    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final ValidateToken validateToken;

    // 토큰 발행 Method
    public Map<String, Object> generateTokens(Long userId, String email) {
        //token 발행
        Map<String, Object> tokens = jwtProvider.createToken(userId, email);

        // redis에 refreshToken 저장
        RefreshTokenEntity refreshToken = new RefreshTokenEntity(userId,
                (String) tokens.get("refreshToken"));
        refreshTokenRepository.save(refreshToken);

        return tokens;
    }

    // 로그인
    @Transactional
    public NewUserResponseDto loginService(String id_token) throws AuthorizationException, GlobalException {
        // token 유효성 확인 및 payload 추출
        UserEntity googleUser;

        try {
            googleUser = googleOAuth.authenticate(id_token)
                    .orElseThrow(() -> new AuthorizationException(AuthErrorCode.INVALID_ID_TOKEN));
        } catch (IOException | GeneralSecurityException | AuthorizationException e) {
            log.error(e.getMessage());

            throw new AuthorizationException(GlobalErrorCode.INVALID_TOKEN);
        }

        UserEntity user = userRepository.findByEmail(googleUser.getEmail())
                .orElse(userRepository.save(googleUser));

        return new NewUserResponseDto(user, generateTokens(user.getId(), googleUser.getEmail()));
    }

    // 로그아웃
    @Transactional
    public void logoutService(String authorization) throws AuthorizationException, GlobalException {
        // 토큰 유효성 검사 및 유저 정보 추출
        UserEntity user = validateToken.validateAuthorization(authorization);

        // redis 내 refresh token 데이터 삭제
        refreshTokenRepository.deleteById(user.getId());
    }

    // 회원탈퇴
    @Transactional
    public void leaveService(String authorization) throws AuthorizationException, GlobalException {
        // 토큰 유효성 검사 및 유저 정보 추출
        UserEntity user = validateToken.validateAuthorization(authorization);

        // redis 내 refresh token 데이터 삭제
        refreshTokenRepository.deleteById(user.getId());

        // db 내 user 데이터 삭제
        userRepository.delete(user);
    }

    // access token 재발급
    public RefreshTokenResponseDto refreshService(String authorization, String bearer_refresh) throws AuthorizationException, GlobalException {
        // Token refreshing 허가 여부
        boolean isAllowed = false;

        // accessToken 만료 검사
        try {
            validateToken.validateAuthorization(authorization);
        } catch (AuthorizationException e) {
            isAllowed = true;
        }

        // Token refreshing 허가 안 된 경우
        if (!isAllowed)
            throw new GlobalException(AuthErrorCode.ACCESS_TOKEN_STILL_VALID);

        // refreshToken 유효성 검사 및 유저 추출
        UserEntity user = validateToken.validateAuthorization(bearer_refresh);

        // token 재발급
        return new RefreshTokenResponseDto(user, generateTokens(user.getId(), user.getEmail()));
    }
}
