package com.hitokuchi.auth.service;

import com.hitokuchi.auth.domain.User;
import com.hitokuchi.auth.dto.AuthResponse;
import com.hitokuchi.auth.dto.LoginRequest;
import com.hitokuchi.auth.dto.RegisterRequest;
import com.hitokuchi.auth.repository.UserMapper;
import com.hitokuchi.common.exception.DuplicateEmailException;
import com.hitokuchi.common.exception.DuplicateUsernameException;
import com.hitokuchi.common.exception.InvalidCredentialsException;
import com.hitokuchi.security.JwtTokenProvider;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

  private final UserMapper userMapper;
  private final PasswordEncoder passwordEncoder;
  private final JwtTokenProvider jwtTokenProvider;

  public AuthService(
      UserMapper userMapper, PasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider) {
    this.userMapper = userMapper;
    this.passwordEncoder = passwordEncoder;
    this.jwtTokenProvider = jwtTokenProvider;
  }

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
    return AuthResponse.of(jwtTokenProvider.generateToken(user.getId()));
  }

  public AuthResponse login(LoginRequest request) {
    User user =
        userMapper.findByEmail(request.email()).orElseThrow(InvalidCredentialsException::new);
    if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
      throw new InvalidCredentialsException();
    }
    return AuthResponse.of(jwtTokenProvider.generateToken(user.getId()));
  }
}
