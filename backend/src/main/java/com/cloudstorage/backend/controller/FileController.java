package com.cloudstorage.backend.controller;

import com.cloudstorage.backend.dto.*;
import com.cloudstorage.backend.model.User;
import com.cloudstorage.backend.repository.UserRepository;
import com.cloudstorage.backend.service.FileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/files")
@RequiredArgsConstructor
public class FileController {

    private final FileService fileService;
    private final UserRepository userRepository;

    private User currentUser(Authentication authentication) {
        return userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    @PostMapping("/init-upload")
    public ResponseEntity<InitUploadResponse> initUpload(
            Authentication authentication, @Valid @RequestBody InitUploadRequest request) {
        return ResponseEntity.ok(fileService.initUpload(currentUser(authentication), request));
    }

    @PostMapping("/complete-upload")
    public ResponseEntity<FileResponse> completeUpload(
            Authentication authentication, @Valid @RequestBody CompleteUploadRequest request) {
        return ResponseEntity.ok(fileService.completeUpload(currentUser(authentication), request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<FileResponse> getFile(
            Authentication authentication, @PathVariable UUID id) {
        return ResponseEntity.ok(fileService.getFile(currentUser(authentication), id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFile(
            Authentication authentication, @PathVariable UUID id) {
        fileService.deleteFile(currentUser(authentication), id);
        return ResponseEntity.noContent().build();
    }


        @PatchMapping("/{id}/rename")
    public ResponseEntity<FileResponse> rename(
            Authentication authentication, @PathVariable UUID id, @Valid @RequestBody RenameRequest request) {
        return ResponseEntity.ok(fileService.renameFile(currentUser(authentication), id, request.getNewName()));
    }

    @PatchMapping("/{id}/move")
    public ResponseEntity<FileResponse> move(
            Authentication authentication, @PathVariable UUID id, @RequestBody MoveRequest request) {
        return ResponseEntity.ok(fileService.moveFile(currentUser(authentication), id, request.getTargetFolderId()));
    }

    @PostMapping("/{id}/trash")
    public ResponseEntity<Void> trash(Authentication authentication, @PathVariable UUID id) {
        fileService.trashFile(currentUser(authentication), id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/restore")
    public ResponseEntity<Void> restore(Authentication authentication, @PathVariable UUID id) {
        fileService.restoreFile(currentUser(authentication), id);
        return ResponseEntity.noContent().build();
    }
}