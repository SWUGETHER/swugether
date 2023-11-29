package com.swugether.server.domain.Auth.api;

import com.swugether.server.domain.Auth.application.AuthService;
import com.swugether.server.domain.Auth.dto.NewUserResponseDto;
import com.swugether.server.domain.Auth.dto.RefreshTokenResponseDto;
import com.swugether.server.global.base.dto.DataResponseDto;
import com.swugether.server.global.base.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/user")
public class AuthController {
    final private AuthService authService;

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<ResponseDto> login(@RequestHeader("id-token") String id_token) {
        NewUserResponseDto newUserResponseDto = authService.loginService(id_token);

        return ResponseEntity.created(URI.create("/user/" + newUserResponseDto.getUser_id())).body(DataResponseDto.of(newUserResponseDto, 201));
    }

    // 로그아웃
    @PostMapping("/logout")
    public ResponseEntity<ResponseDto> logout(@RequestHeader("Authorization") String bearer_token) {
        authService.logoutService(bearer_token);

        return ResponseEntity.ok(ResponseDto.of(HttpStatus.OK));
    }

    // 회원탈퇴
    @PostMapping("/leave")
    public ResponseEntity<ResponseDto> leave(@RequestHeader("Authorization") String bearer_token) {
        authService.leaveService(bearer_token);

        return ResponseEntity.ok(ResponseDto.of(HttpStatus.OK));
    }

    // AccessToken 재발급
    @GetMapping("/refresh")
    public ResponseEntity<ResponseDto> refresh(@RequestHeader("Authorization") String bearer_token,
                                               @RequestHeader("Refresh") String bearer_refresh) {
        RefreshTokenResponseDto refreshTokenResponseDto = authService.refreshService(bearer_token, bearer_refresh);

        return ResponseEntity.status(201).body(DataResponseDto.of(refreshTokenResponseDto, 201));
    }
}
