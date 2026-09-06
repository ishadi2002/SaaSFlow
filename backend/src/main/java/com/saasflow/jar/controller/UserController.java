package com.saasflow.jar.controller;

import com.saasflow.jar.entity.User;
import com.saasflow.jar.repository.UserRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class UserController {

    private final UserRepository userRepository;

    public UserController(
            UserRepository userRepository
    ) {
        this.userRepository = userRepository;
    }

    // Logged-in users can view their profile
    @GetMapping("/profile")
    public ResponseEntity<Map<String, Object>> getProfile(
            Authentication authentication
    ) {

        User user = userRepository
                .findByEmail(authentication.getName())
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );

        Map<String, Object> response =
                new LinkedHashMap<>();

        response.put("id", user.getId());
        response.put("name", user.getName());
        response.put("email", user.getEmail());
        response.put("role", user.getRole());

        return ResponseEntity.ok(response);
    }

    // Logged-in users can access dashboard API
    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> dashboard(
            Authentication authentication
    ) {

        User user = userRepository
                .findByEmail(authentication.getName())
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );

        Map<String, Object> response =
                new LinkedHashMap<>();

        response.put(
                "message",
                "Welcome to SaaSFlow Dashboard!"
        );

        response.put("user", user.getName());
        response.put("email", user.getEmail());
        response.put("authenticated", true);

        return ResponseEntity.ok(response);
    }
}