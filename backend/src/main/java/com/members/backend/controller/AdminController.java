package com.members.backend.controller;

import com.members.backend.repository.QuestionRepository;
import com.members.backend.repository.UserRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;
    private final com.members.backend.repository.ReservationRepository reservationRepository;

    public AdminController(QuestionRepository questionRepository, UserRepository userRepository, com.members.backend.repository.ReservationRepository reservationRepository) {
        this.questionRepository = questionRepository;
        this.userRepository = userRepository;
        this.reservationRepository = reservationRepository;
    }

    @GetMapping("/stats")
    public Map<String, Object> getAdminStats() {
        Map<String, Object> stats = new HashMap<>();
        
        long totalQuestions = questionRepository.count();
        long totalUsers = userRepository.count();
        long totalReservations = reservationRepository.count();

        stats.put("totalQuestions", totalQuestions);
        stats.put("totalUsers", totalUsers);
        stats.put("totalReservations", totalReservations);
        stats.put("pendingAnswers", questionRepository.findAll().stream().filter(q -> "대기중".equals(q.getStatus())).count());
        
        return stats;
    }

    @GetMapping("/reservations")
    public java.util.List<com.members.backend.domain.Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }
}
