package com.hitokuchi.auth.controller;

import com.hitokuchi.auth.dto.AuthResponse;
import com.hitokuchi.auth.dto.LoginRequest;
import com.hitokuchi.auth.dto.LogoutRequest;
import com.hitokuchi.auth.dto.RefreshRequest;
import com.hitokuchi.auth.dto.RefreshResponse;
import com.hitokuchi.auth.dto.RegisterRequest;
import com.hitokuchi.auth.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

  private final AuthService authService;

  public AuthController(AuthService authService) {
    this.authService = authService;
  }

  @PostMapping("/register")
  @ResponseStatus(HttpStatus.CREATED)
  public AuthResponse register(@RequestBody @Valid RegisterRequest request) {
    return authService.register(request);
  }

  @PostMapping("/login")
  public AuthResponse login(@RequestBody @Valid LoginRequest request) {
    return authService.login(request);
  }

  @PostMapping("/refresh")
  public RefreshResponse refresh(@RequestBody @Valid RefreshRequest request) {
    return authService.refresh(request);
  }

  @PostMapping("/logout")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void logout(@RequestBody @Valid LogoutRequest request) {
    authService.logout(request);
  }
}
