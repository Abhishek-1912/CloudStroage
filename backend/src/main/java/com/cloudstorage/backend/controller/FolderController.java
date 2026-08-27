package com.cloudstorage.backend.controller;

import com.cloudstorage.backend.dto.*;
import com.cloudstorage.backend.model.User;
import com.cloudstorage.backend.repository.UserRepository;
import com.cloudstorage.backend.service.FolderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/folders")
@RequiredArgsConstructor
public class FolderController {

    private final FolderService folderService;
    private final UserRepository userRepository;

    private User currentUser(Authentication authentication) {
        return userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    @PostMapping
    public ResponseEntity<FolderResponse> create(
            Authentication authentication, @Valid @RequestBody CreateFolderRequest request) {
        return ResponseEntity.ok(folderService.createFolder(currentUser(authentication), request));
    }

    @GetMapping("/root")
    public ResponseEntity<FolderContentsResponse> getRoot(Authentication authentication) {
        return ResponseEntity.ok(folderService.getContents(currentUser(authentication), null));
    }

    @GetMapping("/{id}")
    public ResponseEntity<FolderContentsResponse> getContents(
            Authentication authentication, @PathVariable UUID id) {
        return ResponseEntity.ok(folderService.getContents(currentUser(authentication), id));
    }

    @PatchMapping("/{id}/rename")
    public ResponseEntity<FolderResponse> rename(
            Authentication authentication, @PathVariable UUID id, @Valid @RequestBody RenameRequest request) {
        return ResponseEntity.ok(folderService.renameFolder(currentUser(authentication), id, request.getNewName()));
    }

    @PatchMapping("/{id}/move")
    public ResponseEntity<FolderResponse> move(
            Authentication authentication, @PathVariable UUID id, @RequestBody MoveRequest request) {
        return ResponseEntity.ok(folderService.moveFolder(currentUser(authentication), id, request.getTargetFolderId()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> trash(Authentication authentication, @PathVariable UUID id) {
        folderService.trashFolder(currentUser(authentication), id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/restore")
    public ResponseEntity<Void> restore(Authentication authentication, @PathVariable UUID id) {
        folderService.restoreFolder(currentUser(authentication), id);
        return ResponseEntity.noContent().build();
    }
}