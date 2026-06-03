package com.members.backend.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
public class Question {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String title;
    private String content;
    private String author;
    private String password;
    
    @Column(length = 2000)
    private String answer;
    
    private String status = "대기중";
    private LocalDateTime createdAt = LocalDateTime.now();
}
