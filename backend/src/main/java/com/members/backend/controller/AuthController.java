package com.members.backend.controller;

import com.members.backend.domain.User;
import com.members.backend.repository.UserRepository;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    
    // 카카오 디벨로퍼스에서 발급받은 REST API 키 입력
    private final String KAKAO_CLIENT_ID = "YOUR_KAKAO_CLIENT_ID";
    private final String KAKAO_REDIRECT_URI = "http://localhost:3000/ko/oauth/kakao";

    // 구글/애플 인증 키 세팅 
    private final String GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID";
    private final String APPLE_CLIENT_ID = "YOUR_APPLE_CLIENT_ID";

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/kakao")
    public ResponseEntity<?> kakaoLogin(@RequestBody Map<String, String> body) {
        String code = body.get("code");
        if (code == null) return ResponseEntity.badRequest().body("Code is missing");

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", KAKAO_CLIENT_ID);
        params.add("redirect_uri", KAKAO_REDIRECT_URI);
        params.add("code", code);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        try {
            ResponseEntity<Map> tokenResponse = restTemplate.postForEntity(
                    "https://kauth.kakao.com/oauth/token", request, Map.class);
            String accessToken = (String) tokenResponse.getBody().get("access_token");

            HttpHeaders userHeaders = new HttpHeaders();
            userHeaders.setBearerAuth(accessToken);
            HttpEntity<Void> userRequest = new HttpEntity<>(userHeaders);

            ResponseEntity<Map> userResponse = restTemplate.exchange(
                    "https://kapi.kakao.com/v2/user/me", HttpMethod.GET, userRequest, Map.class);

            Map<String, Object> userInfo = userResponse.getBody();
            String providerId = userInfo.get("id").toString();
            Map<String, Object> properties = (Map<String, Object>) userInfo.get("properties");
            String nickname = properties != null ? (String) properties.get("nickname") : "KakaoUser";
            String profileImageUrl = properties != null ? (String) properties.get("profile_image") : "";

            return handleSocialLogin("KAKAO", providerId, nickname, profileImageUrl);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Kakao Auth Failed: " + e.getMessage());
        }
    }

    @PostMapping("/google")
    public ResponseEntity<?> googleLogin(@RequestBody Map<String, String> body) {
        // 실제 운영 환경에서는 Google OAuth 토큰 검증 로직 구현 필요
        // 데모용으로 임시 성공 처리 (실제 코드를 바탕으로 providerId 추출)
        String code = body.get("code");
        if (code == null) return ResponseEntity.badRequest().body("Code is missing");
        
        String dummyProviderId = "google_" + code.substring(0, Math.min(10, code.length()));
        return handleSocialLogin("GOOGLE", dummyProviderId, "Google User", "");
    }

    @PostMapping("/apple")
    public ResponseEntity<?> appleLogin(@RequestBody Map<String, String> body) {
        // 실제 운영 환경에서는 Apple OAuth 토큰 검증 로직 구현 필요
        String code = body.get("code");
        if (code == null) return ResponseEntity.badRequest().body("Code is missing");
        
        String dummyProviderId = "apple_" + code.substring(0, Math.min(10, code.length()));
        return handleSocialLogin("APPLE", dummyProviderId, "Apple User", "");
    }

    private ResponseEntity<?> handleSocialLogin(String provider, String providerId, String nickname, String profileImageUrl) {
        Optional<User> existingUser = userRepository.findByProviderAndProviderId(provider, providerId);
        User user;
        if (existingUser.isPresent()) {
            user = existingUser.get();
            user.setLastLoginAt(java.time.LocalDateTime.now());
            userRepository.save(user);
        } else {
            user = new User();
            user.setProvider(provider);
            user.setProviderId(providerId);
            user.setNickname(nickname);
            user.setProfileImageUrl(profileImageUrl);
            userRepository.save(user);
        }

        return ResponseEntity.ok(Map.of(
                "message", provider + " Login Success",
                "user", user,
                "token", "demo-jwt-token-for-" + user.getId()
        ));
    }
}
