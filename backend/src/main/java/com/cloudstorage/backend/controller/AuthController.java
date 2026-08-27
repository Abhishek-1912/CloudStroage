package com.cloudstorage.backend.controller;

import com.cloudstorage.backend.dto.AuthResponse;
import com.cloudstorage.backend.dto.LoginRequest;
import com.cloudstorage.backend.dto.RegisterRequest;
import com.cloudstorage.backend.repository.UserRepository;
import com.cloudstorage.backend.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(
                userRepository.findByEmail(email)
                        .orElseThrow(() -> new IllegalArgumentException("User not found"))
        );
    }
}