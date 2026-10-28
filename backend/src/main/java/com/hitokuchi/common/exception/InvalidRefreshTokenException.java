package com.hitokuchi.common.exception;

public class InvalidRefreshTokenException extends RuntimeException {

  public InvalidRefreshTokenException() {
    super("リフレッシュトークンが無効です");
  }
}
