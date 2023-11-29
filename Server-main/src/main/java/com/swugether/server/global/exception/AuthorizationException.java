package com.swugether.server.global.exception;

import com.swugether.server.global.base.constant.ErrorCode;
import lombok.Getter;

@Getter
public class AuthorizationException extends RuntimeException {
    private final ErrorCode errorCode;

    public AuthorizationException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
