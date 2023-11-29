package com.swugether.server.global.exception.handler;

import com.swugether.server.global.base.constant.GlobalErrorCode;
import com.swugether.server.global.base.dto.ResponseDto;
import com.swugether.server.global.exception.AuthorizationException;
import com.swugether.server.global.exception.GlobalException;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.io.IOException;
import java.security.GeneralSecurityException;

@RestControllerAdvice(annotations = {RestController.class})
@Slf4j
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
    // RuntimeException
    @ExceptionHandler(GlobalException.class)
    public ResponseEntity<ResponseDto> exceptionHandler(GlobalException e) {
        HttpStatus httpStatus = e.getErrorCode().getHttpStatus();
        String message = e.getMessage();

        e.printStackTrace();

        return ResponseEntity.status(httpStatus.value()).body(ResponseDto.of(httpStatus.value(), message));
    }

    // GeneralSecurityException
    @ExceptionHandler(GeneralSecurityException.class)
    public ResponseEntity<ResponseDto> exceptionHandler(GeneralSecurityException e) {
        HttpStatus httpStatus = HttpStatus.UNAUTHORIZED;
        String message = e.getMessage();

        e.printStackTrace();

        return ResponseEntity.status(httpStatus.value()).body(ResponseDto.of(httpStatus.value(), message));
    }

    // AuthorizationException
    @ExceptionHandler(AuthorizationException.class)
    public ResponseEntity<ResponseDto> exceptionHandler(AuthorizationException e) {
        HttpStatus httpStatus = HttpStatus.UNAUTHORIZED;
        String message = e.getMessage();

        e.printStackTrace();

        return ResponseEntity.status(httpStatus.value()).body(ResponseDto.of(httpStatus.value(), message));
    }

    // ExpiredJwtException
    @ExceptionHandler(ExpiredJwtException.class)
    public ResponseEntity<ResponseDto> exceptionHandler(ExpiredJwtException e) {
        HttpStatus httpStatus = GlobalErrorCode.EXPIRED_JWT.getHttpStatus();
        String message = GlobalErrorCode.EXPIRED_JWT.getMessage();

        e.printStackTrace();

        return ResponseEntity.status(httpStatus.value()).body(ResponseDto.of(httpStatus.value(), message));
    }

    // MethodArgumentNotValidException
    @Override
    public ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException e, HttpHeaders headers, HttpStatus status, WebRequest request) {
        HttpStatus httpStatus = HttpStatus.BAD_REQUEST;
        String org_message = e.getMessage();
        String message = e.getMessage();

        if (org_message.contains("null"))
            message = GlobalErrorCode.VALUE_REQUIRED.getMessage();

        e.printStackTrace();

        return ResponseEntity.badRequest().body(ResponseDto.of(httpStatus.value(), message));
    }

    // IOException
    @ExceptionHandler(value = IOException.class)
    public ResponseEntity<ResponseDto> exceptionHandler(IOException e) {
        HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        String message = httpStatus.getReasonPhrase();

        log.error(e.getMessage());
        e.printStackTrace();

        return ResponseEntity.internalServerError().body(ResponseDto.of(httpStatus.value(), message));
    }

    // HttpRequestMethodNotSupportedException
    @Override
    public ResponseEntity<Object> handleHttpRequestMethodNotSupported(
            HttpRequestMethodNotSupportedException e, HttpHeaders headers, HttpStatus status, WebRequest request) {
        HttpStatus httpStatus = GlobalErrorCode.METHOD_NOT_ALLOWED.getHttpStatus();
        String message = e.getMessage();

        e.printStackTrace();

        return ResponseEntity.status(httpStatus.value()).body(ResponseDto.of(httpStatus.value(), message));
    }

    // InternalServerError
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ResponseDto> exceptionHandler(Exception e) {
        HttpStatus httpStatus = GlobalErrorCode.INTERNAL_SERVER_ERROR.getHttpStatus();
        String message = httpStatus.getReasonPhrase();

        e.printStackTrace();

        return ResponseEntity.status(httpStatus.value()).body(ResponseDto.of(httpStatus.value(), message));
    }
}
