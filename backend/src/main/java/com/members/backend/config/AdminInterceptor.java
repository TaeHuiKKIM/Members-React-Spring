package com.members.backend.config;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class AdminInterceptor implements HandlerInterceptor {

    private static final String MASTER_PASSWORD = "admin1234!";

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // OPTIONS 메서드는 항상 허용 (CORS Preflight)
        if (request.getMethod().equalsIgnoreCase("OPTIONS")) {
            return true;
        }

        String adminToken = request.getHeader("X-Admin-Token");
        
        if (MASTER_PASSWORD.equals(adminToken)) {
            return true;
        }

        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json;charset=UTF-8");
        response.getWriter().write("{\"error\": \"Unauthorized Admin Access\"}");
        return false;
    }
}
