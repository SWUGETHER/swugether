package com.swugether.server.global.base.constant;

import org.springframework.http.HttpStatus;

public interface ErrorCode {
    String name();

    HttpStatus getHttpStatus();

    String getMessage();
}
