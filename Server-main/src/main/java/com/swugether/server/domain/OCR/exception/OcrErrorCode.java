package com.swugether.server.domain.OCR.exception;

import com.swugether.server.global.base.constant.ErrorCode;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum OcrErrorCode implements ErrorCode {
    INVALID_IMAGE_FORMAT(HttpStatus.BAD_REQUEST, "Invalid file format. (Image required.)"),
    API_REQUEST_FAILED(HttpStatus.BAD_GATEWAY, "OCR API request failed.");

    private final HttpStatus httpStatus;
    private final String message;

    OcrErrorCode(HttpStatus httpStatus, String message) {
        this.httpStatus = httpStatus;
        this.message = message;
    }
}
