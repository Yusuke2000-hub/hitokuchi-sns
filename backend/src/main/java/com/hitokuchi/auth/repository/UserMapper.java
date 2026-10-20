package com.hitokuchi.auth.repository;

import com.hitokuchi.auth.domain.User;
import java.util.Optional;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface UserMapper {

  @Select("SELECT * FROM users WHERE email = #{email}")
  Optional<User> findByEmail(String email);

  @Select("SELECT * FROM users WHERE username = #{username}")
  Optional<User> findByUsername(String username);

  @Insert(
      "INSERT INTO users (email, password_hash, username) VALUES (#{email}, #{passwordHash}, #{username})")
  @Options(useGeneratedKeys = true, keyProperty = "id")
  void insert(User user);
}
