package com.swugether.server.domain.Auth.exception;

import com.swugether.server.global.base.constant.ErrorCode;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum AuthErrorCode implements ErrorCode {
    ACCESS_TOKEN_STILL_VALID(HttpStatus.FORBIDDEN, "Refreshing token failed. - Access token still valid."),
    INVALID_ID_TOKEN(HttpStatus.UNAUTHORIZED, "Invalid id-token.");

    private final HttpStatus httpStatus;
    private final String message;

    AuthErrorCode(HttpStatus httpStatus, String message) {
        this.httpStatus = httpStatus;
        this.message = message;
    }
}
