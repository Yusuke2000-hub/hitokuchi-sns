package com.hitokuchi.common.exception;

import com.hitokuchi.common.dto.ErrorResponse;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

@RestControllerAdvice
public class GlobalExceptionHandler {

  private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

  @ExceptionHandler(MethodArgumentNotValidException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public ErrorResponse handleValidation(MethodArgumentNotValidException ex) {
    List<ErrorResponse.FieldError> errors =
        ex.getBindingResult().getFieldErrors().stream()
            .map(f -> new ErrorResponse.FieldError(f.getField(), f.getDefaultMessage()))
            .toList();
    return new ErrorResponse(HttpStatus.BAD_REQUEST.value(), "入力値が不正です", errors);
  }

  @ExceptionHandler(HttpMessageNotReadableException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public ErrorResponse handleNotReadable(HttpMessageNotReadableException ex) {
    return new ErrorResponse(HttpStatus.BAD_REQUEST.value(), "リクエストの形式が正しくありません", null);
  }

  @ExceptionHandler(NoResourceFoundException.class)
  @ResponseStatus(HttpStatus.NOT_FOUND)
  public ErrorResponse handleNotFound(NoResourceFoundException ex) {
    return new ErrorResponse(HttpStatus.NOT_FOUND.value(), "リソースが見つかりません", null);
  }

  @ExceptionHandler(DuplicateEmailException.class)
  @ResponseStatus(HttpStatus.CONFLICT)
  public ErrorResponse handleDuplicateEmail(DuplicateEmailException ex) {
    return new ErrorResponse(HttpStatus.CONFLICT.value(), ex.getMessage(), null);
  }

  @ExceptionHandler(DuplicateUsernameException.class)
  @ResponseStatus(HttpStatus.CONFLICT)
  public ErrorResponse handleDuplicateUsername(DuplicateUsernameException ex) {
    return new ErrorResponse(HttpStatus.CONFLICT.value(), ex.getMessage(), null);
  }

  @ExceptionHandler(InvalidCredentialsException.class)
  @ResponseStatus(HttpStatus.UNAUTHORIZED)
  public ErrorResponse handleInvalidCredentials(InvalidCredentialsException ex) {
    return new ErrorResponse(HttpStatus.UNAUTHORIZED.value(), ex.getMessage(), null);
  }

  @ExceptionHandler(InvalidRefreshTokenException.class)
  @ResponseStatus(HttpStatus.UNAUTHORIZED)
  public ErrorResponse handleInvalidRefreshToken(InvalidRefreshTokenException ex) {
    return new ErrorResponse(HttpStatus.UNAUTHORIZED.value(), ex.getMessage(), null);
  }

  @ExceptionHandler(Exception.class)
  @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
  public ErrorResponse handleException(Exception ex) {
    log.error("予期しないエラーが発生しました", ex);
    return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "サーバーでエラーが発生しました", null);
  }
}
