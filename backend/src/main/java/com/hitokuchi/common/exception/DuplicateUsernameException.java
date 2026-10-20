package com.hitokuchi.common.exception;

public class DuplicateUsernameException extends RuntimeException {

  public DuplicateUsernameException() {
    super("このユーザー名はすでに使用されています");
  }
}
