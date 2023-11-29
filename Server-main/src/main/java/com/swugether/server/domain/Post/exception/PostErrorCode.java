package com.swugether.server.domain.Post.exception;

import com.swugether.server.global.base.constant.ErrorCode;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum PostErrorCode implements ErrorCode {
    POST_ACCESS_DENIED(HttpStatus.FORBIDDEN, "Access denied. (not the writer)"),
    POST_NOT_FOUND(HttpStatus.NOT_FOUND, "Post not found."),
    INVALID_VALUE(HttpStatus.BAD_REQUEST, "Invalid value"),
    FILE_NOT_FOUND(HttpStatus.INTERNAL_SERVER_ERROR, "File not found."),
    FILE_DELETION_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "File deletion failed: ");

    private final HttpStatus httpStatus;
    private final String message;

    PostErrorCode(HttpStatus httpStatus, String message) {
        this.httpStatus = httpStatus;
        this.message = message;
    }
}