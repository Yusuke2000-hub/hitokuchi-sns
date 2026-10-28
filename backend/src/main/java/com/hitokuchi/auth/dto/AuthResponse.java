package com.hitokuchi.auth.dto;

public record AuthResponse(
    String accessToken, String refreshToken, String tokenType, Long userId, String username) {

  public static AuthResponse of(
      String accessToken, String refreshToken, Long userId, String username) {
    return new AuthResponse(accessToken, refreshToken, "Bearer", userId, username);
  }
}
