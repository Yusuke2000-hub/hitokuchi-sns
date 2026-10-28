package com.hitokuchi.auth.dto;

public record RefreshResponse(String accessToken, String tokenType) {

  public static RefreshResponse of(String accessToken) {
    return new RefreshResponse(accessToken, "Bearer");
  }
}
