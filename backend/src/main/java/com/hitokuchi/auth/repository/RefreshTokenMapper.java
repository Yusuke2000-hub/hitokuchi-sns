package com.hitokuchi.auth.repository;

import com.hitokuchi.auth.domain.RefreshToken;
import java.util.Optional;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface RefreshTokenMapper {

  @Insert(
      "INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (#{userId}, #{token},"
          + " #{expiresAt})")
  @Options(useGeneratedKeys = true, keyProperty = "id")
  void insert(RefreshToken refreshToken);

  @Select("SELECT * FROM refresh_tokens WHERE token = #{token}")
  Optional<RefreshToken> findByToken(String token);

  @Delete("DELETE FROM refresh_tokens WHERE token = #{token}")
  void deleteByToken(String token);
}
