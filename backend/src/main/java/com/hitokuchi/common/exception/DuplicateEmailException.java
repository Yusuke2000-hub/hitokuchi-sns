package com.hitokuchi.common.exception;

public class DuplicateEmailException extends RuntimeException {

  public DuplicateEmailException() {
    super("このメールアドレスはすでに登録されています");
  }
}
