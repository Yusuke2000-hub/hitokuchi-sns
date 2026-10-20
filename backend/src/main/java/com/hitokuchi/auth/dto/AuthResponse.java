package com.hitokuchi.auth.dto;

public record AuthResponse(String token, String tokenType) {

  public static AuthResponse of(String token) {
    return new AuthResponse(token, "Bearer");
  }
}
