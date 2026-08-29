package com.cloudstorage.backend.controller;

import com.cloudstorage.backend.dto.CreateShareRequest;
import com.cloudstorage.backend.dto.FileResponse;
import com.cloudstorage.backend.dto.ShareResponse;
import com.cloudstorage.backend.model.User;
import com.cloudstorage.backend.repository.UserRepository;
import com.cloudstorage.backend.service.ShareService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/shares")
@RequiredArgsConstructor
public class ShareController {

    private final ShareService shareService;
    private final UserRepository userRepository;

    private User currentUser(Authentication authentication) {
        return userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    @PostMapping
    public ResponseEntity<ShareResponse> create(
            Authentication authentication, @Valid @RequestBody CreateShareRequest request) {
        return ResponseEntity.ok(shareService.createShare(currentUser(authentication), request));
    }

    @GetMapping("/file/{fileId}")
    public ResponseEntity<List<ShareResponse>> list(
            Authentication authentication, @PathVariable UUID fileId) {
        return ResponseEntity.ok(shareService.listShares(currentUser(authentication), fileId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> revoke(Authentication authentication, @PathVariable UUID id) {
        shareService.revokeShare(currentUser(authentication), id);
        return ResponseEntity.noContent().build();
    }

        @GetMapping("/shared-with-me")
    public ResponseEntity<List<FileResponse>> sharedWithMe(Authentication authentication) {
        return ResponseEntity.ok(shareService.listSharedWithMe(currentUser(authentication)));
    }
}