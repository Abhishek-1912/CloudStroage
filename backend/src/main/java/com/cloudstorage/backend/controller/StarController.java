package com.cloudstorage.backend.controller;

import com.cloudstorage.backend.dto.FileResponse;
import com.cloudstorage.backend.model.User;
import com.cloudstorage.backend.repository.UserRepository;
import com.cloudstorage.backend.service.StarService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/stars")
@RequiredArgsConstructor
public class StarController {

    private final StarService starService;
    private final UserRepository userRepository;

    private User currentUser(Authentication authentication) {
        return userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    @PostMapping("/{fileId}")
    public ResponseEntity<Void> star(Authentication authentication, @PathVariable UUID fileId) {
        starService.star(currentUser(authentication), fileId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{fileId}")
    public ResponseEntity<Void> unstar(Authentication authentication, @PathVariable UUID fileId) {
        starService.unstar(currentUser(authentication), fileId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<FileResponse>> listStarred(Authentication authentication) {
        return ResponseEntity.ok(starService.listStarred(currentUser(authentication)));
    }
}