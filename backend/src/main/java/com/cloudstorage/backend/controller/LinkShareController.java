package com.cloudstorage.backend.controller;

import com.cloudstorage.backend.dto.*;
import com.cloudstorage.backend.model.User;
import com.cloudstorage.backend.repository.UserRepository;
import com.cloudstorage.backend.service.LinkShareService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class LinkShareController {

    private final LinkShareService linkShareService;
    private final UserRepository userRepository;

    private User currentUser(Authentication authentication) {
        return userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    @PostMapping("/api/link-shares")
    public ResponseEntity<LinkShareResponse> create(
            Authentication authentication, @RequestBody CreateLinkShareRequest request) {
        return ResponseEntity.ok(linkShareService.createLink(currentUser(authentication), request));
    }

    @PostMapping("/api/public-links/{token}")
    public ResponseEntity<FileResponse> access(
            @PathVariable String token, @RequestBody(required = false) AccessLinkRequest request) {
        return ResponseEntity.ok(linkShareService.accessLink(token, request));
    }

    @DeleteMapping("/api/link-shares/{id}")
    public ResponseEntity<Void> revoke(Authentication authentication, @PathVariable UUID id) {
        linkShareService.revokeLink(currentUser(authentication), id);
        return ResponseEntity.noContent().build();
    }
}