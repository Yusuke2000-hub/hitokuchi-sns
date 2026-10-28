package com.hitokuchi.auth.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.hitokuchi.auth.dto.AuthResponse;
import com.hitokuchi.auth.dto.LogoutRequest;
import com.hitokuchi.auth.dto.RefreshRequest;
import com.hitokuchi.auth.dto.RefreshResponse;
import com.hitokuchi.auth.service.AuthService;
import com.hitokuchi.common.exception.GlobalExceptionHandler;
import com.hitokuchi.common.exception.InvalidRefreshTokenException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

@ExtendWith(MockitoExtension.class)
class AuthControllerTest {

  @Mock AuthService authService;

  private MockMvc mockMvc;

  @BeforeEach
  void setup() {
    mockMvc =
        MockMvcBuilders.standaloneSetup(new AuthController(authService))
            .setControllerAdvice(new GlobalExceptionHandler())
            .build();
  }

  @Test
  void register_返す201とレスポンスフィールド() throws Exception {
    when(authService.register(any()))
        .thenReturn(
            AuthResponse.of(
                "access-token-value", "550e8400-e29b-41d4-a716-446655440000", 1L, "testuser"));

    mockMvc
        .perform(
            post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                    "{\"email\":\"test@example.com\",\"password\":\"password123\","
                        + "\"username\":\"testuser\"}"))
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.accessToken").exists())
        .andExpect(jsonPath("$.refreshToken").exists())
        .andExpect(jsonPath("$.tokenType").value("Bearer"))
        .andExpect(jsonPath("$.userId").value(1))
        .andExpect(jsonPath("$.username").value("testuser"));
  }

  @Test
  void login_返す200とレスポンスフィールド() throws Exception {
    when(authService.login(any()))
        .thenReturn(
            AuthResponse.of(
                "access-token-value", "550e8400-e29b-41d4-a716-446655440000", 1L, "testuser"));

    mockMvc
        .perform(
            post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\":\"test@example.com\",\"password\":\"password123\"}"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.accessToken").exists())
        .andExpect(jsonPath("$.refreshToken").exists())
        .andExpect(jsonPath("$.tokenType").value("Bearer"))
        .andExpect(jsonPath("$.userId").value(1))
        .andExpect(jsonPath("$.username").value("testuser"));
  }

  @Test
  void refresh_有効なトークンで200() throws Exception {
    when(authService.refresh(any())).thenReturn(RefreshResponse.of("new-access-token"));

    mockMvc
        .perform(
            post("/api/auth/refresh")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"refreshToken\":\"550e8400-e29b-41d4-a716-446655440000\"}"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.accessToken").exists())
        .andExpect(jsonPath("$.tokenType").value("Bearer"));
  }

  @Test
  void refresh_無効トークンで401() throws Exception {
    when(authService.refresh(any(RefreshRequest.class)))
        .thenThrow(new InvalidRefreshTokenException());

    mockMvc
        .perform(
            post("/api/auth/refresh")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"refreshToken\":\"invalid-token\"}"))
        .andExpect(status().isUnauthorized())
        .andExpect(jsonPath("$.status").value(401))
        .andExpect(jsonPath("$.message").value("リフレッシュトークンが無効です"));
  }

  @Test
  void refresh_空トークンで400() throws Exception {
    mockMvc
        .perform(
            post("/api/auth/refresh")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"refreshToken\":\"\"}"))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.status").value(400));
  }

  @Test
  void logout_有効なトークンで204() throws Exception {
    doNothing().when(authService).logout(any(LogoutRequest.class));

    mockMvc
        .perform(
            post("/api/auth/logout")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"refreshToken\":\"550e8400-e29b-41d4-a716-446655440000\"}"))
        .andExpect(status().isNoContent());
  }

  @Test
  void logout_空トークンで400() throws Exception {
    mockMvc
        .perform(
            post("/api/auth/logout")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"refreshToken\":\"\"}"))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.status").value(400));
  }
}
