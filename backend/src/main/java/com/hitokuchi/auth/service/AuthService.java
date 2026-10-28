package com.hitokuchi.auth.service;

import com.hitokuchi.auth.domain.RefreshToken;
import com.hitokuchi.auth.domain.User;
import com.hitokuchi.auth.dto.AuthResponse;
import com.hitokuchi.auth.dto.LoginRequest;
import com.hitokuchi.auth.dto.LogoutRequest;
import com.hitokuchi.auth.dto.RefreshRequest;
import com.hitokuchi.auth.dto.RefreshResponse;
import com.hitokuchi.auth.dto.RegisterRequest;
import com.hitokuchi.auth.repository.RefreshTokenMapper;
import com.hitokuchi.auth.repository.UserMapper;
import com.hitokuchi.common.exception.DuplicateEmailException;
import com.hitokuchi.common.exception.DuplicateUsernameException;
import com.hitokuchi.common.exception.InvalidCredentialsException;
import com.hitokuchi.common.exception.InvalidRefreshTokenException;
import com.hitokuchi.security.JwtTokenProvider;
import java.time.LocalDateTime;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

  private final UserMapper userMapper;
  private final PasswordEncoder passwordEncoder;
  private final JwtTokenProvider jwtTokenProvider;
  private final RefreshTokenMapper refreshTokenMapper;
  private final long refreshExpirationMs;

  public AuthService(
      UserMapper userMapper,
      PasswordEncoder passwordEncoder,
      JwtTokenProvider jwtTokenProvider,
      RefreshTokenMapper refreshTokenMapper,
      @Value("${app.jwt.refresh-expiration-ms}") long refreshExpirationMs) {
    this.userMapper = userMapper;
    this.passwordEncoder = passwordEncoder;
    this.jwtTokenProvider = jwtTokenProvider;
    this.refreshTokenMapper = refreshTokenMapper;
    this.refreshExpirationMs = refreshExpirationMs;
  }

  @Transactional
  public AuthResponse register(RegisterRequest request) {
    if (userMapper.findByEmail(request.email()).isPresent()) {
      throw new DuplicateEmailException();
    }
    if (userMapper.findByUsername(request.username()).isPresent()) {
      throw new DuplicateUsernameException();
    }
    User user = new User();
    user.setEmail(request.email());
    user.setPasswordHash(passwordEncoder.encode(request.password()));
    user.setUsername(request.username());
    userMapper.insert(user);
    return buildAuthResponse(user);
  }

  @Transactional
  public AuthResponse login(LoginRequest request) {
    User user =
        userMapper.findByEmail(request.email()).orElseThrow(InvalidCredentialsException::new);
    if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
      throw new InvalidCredentialsException();
    }
    return buildAuthResponse(user);
  }

  public RefreshResponse refresh(RefreshRequest request) {
    RefreshToken refreshToken =
        refreshTokenMapper
            .findByToken(request.refreshToken())
            .orElseThrow(InvalidRefreshTokenException::new);
    if (refreshToken.getExpiresAt().isBefore(LocalDateTime.now())) {
      throw new InvalidRefreshTokenException();
    }
    String accessToken = jwtTokenProvider.generateToken(refreshToken.getUserId());
    return RefreshResponse.of(accessToken);
  }

  public void logout(LogoutRequest request) {
    refreshTokenMapper.deleteByToken(request.refreshToken());
  }

  private AuthResponse buildAuthResponse(User user) {
    String accessToken = jwtTokenProvider.generateToken(user.getId());
    String refreshTokenStr = UUID.randomUUID().toString();
    LocalDateTime expiresAt = LocalDateTime.now().plusNanos(refreshExpirationMs * 1_000_000L);
    RefreshToken refreshToken = new RefreshToken();
    refreshToken.setUserId(user.getId());
    refreshToken.setToken(refreshTokenStr);
    refreshToken.setExpiresAt(expiresAt);
    refreshTokenMapper.insert(refreshToken);
    return AuthResponse.of(accessToken, refreshTokenStr, user.getId(), user.getUsername());
  }
}
