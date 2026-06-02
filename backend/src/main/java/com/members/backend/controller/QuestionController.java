package com.members.backend.controller;

import com.members.backend.domain.Question;
import com.members.backend.repository.QuestionRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {
    
    private final QuestionRepository questionRepository;

    public QuestionController(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    @PostMapping
    public Question createQuestion(@RequestBody Question question) {
        return questionRepository.save(question);
    }

    @GetMapping
    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }
}
