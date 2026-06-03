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

    @PutMapping("/{id}/answer")
    public org.springframework.http.ResponseEntity<?> answerQuestion(@PathVariable Long id, @RequestBody java.util.Map<String, String> body) {
        String answerContent = body.get("answer");
        if (answerContent == null || answerContent.trim().isEmpty()) {
            return org.springframework.http.ResponseEntity.badRequest().body("Answer cannot be empty");
        }

        return questionRepository.findById(id).map(question -> {
            question.setAnswer(answerContent);
            question.setStatus("답변완료");
            questionRepository.save(question);
            return org.springframework.http.ResponseEntity.ok(question);
        }).orElse(org.springframework.http.ResponseEntity.notFound().build());
    }
}
