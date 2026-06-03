package com.members.backend.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter @Setter
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 소셜 로그인 제공자 (예: KAKAO, GOOGLE, APPLE)
    @Column(nullable = false)
    private String provider;

    // 해당 제공자의 고유 식별자
    @Column(nullable = false)
    private String providerId;

    private String email;
    private String nickname;
    private String profileImageUrl;
    
    @Column(nullable = false)
    private String role = "USER";

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime lastLoginAt = LocalDateTime.now();
}
