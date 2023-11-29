package com.swugether.server.global.base.constant;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum GlobalErrorCode implements ErrorCode {
    INVALID_FILE_FORMAT(HttpStatus.BAD_REQUEST, "Invalid file format. Profile image must be image file."),
    VALUE_REQUIRED(HttpStatus.BAD_REQUEST, "Value required."),
    AUTHORIZATION_FAILED(HttpStatus.UNAUTHORIZED, "Authorization failed"),
    AUTHENTICATION_FAILED(HttpStatus.UNAUTHORIZED, "Authentication failed"),
    INVALID_TOKEN(HttpStatus.UNAUTHORIZED, "Invalid token."),
    TOKEN_REQUIRED(HttpStatus.UNAUTHORIZED, "Access Token required."),
    USER_NOT_FOUND(HttpStatus.UNAUTHORIZED, "User not found."),
    LOGIN_REQUIRED(HttpStatus.FORBIDDEN, "Login required."),
    EXPIRED_JWT(HttpStatus.FORBIDDEN, "Token expired."),
    METHOD_NOT_ALLOWED(HttpStatus.METHOD_NOT_ALLOWED, "Request method is not supported."),
    HTTP_STATUS_IS_NULL(HttpStatus.INTERNAL_SERVER_ERROR, "Http Status is null."),
    FILE_DELETION_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "File deletion failed."),
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error.");

    private final HttpStatus httpStatus;
    private final String message;

    GlobalErrorCode(HttpStatus httpStatus, String message) {
        this.httpStatus = httpStatus;
        this.message = message;
    }
}
