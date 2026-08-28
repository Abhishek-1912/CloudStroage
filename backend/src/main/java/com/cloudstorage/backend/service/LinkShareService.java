package com.cloudstorage.backend.service;

import com.cloudstorage.backend.dto.*;
import com.cloudstorage.backend.model.FileEntity;
import com.cloudstorage.backend.model.LinkShare;
import com.cloudstorage.backend.model.User;
import com.cloudstorage.backend.repository.FileRepository;
import com.cloudstorage.backend.repository.LinkShareRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class LinkShareService {

    private final LinkShareRepository linkShareRepository;
    private final FileRepository fileRepository;
    private final StorageService storageService;
    private final PasswordEncoder passwordEncoder;

    public LinkShareResponse createLink(User owner, CreateLinkShareRequest request) {
        FileEntity file = fileRepository.findById(request.getFileId())
                .orElseThrow(() -> new IllegalArgumentException("File not found"));

        if (!file.getOwner().getId().equals(owner.getId())) {
            throw new SecurityException("Only the owner can create a share link");
        }

        String token = UUID.randomUUID().toString().replace("-", "");

        LinkShare linkShare = LinkShare.builder()
                .file(file)
                .token(token)
                .passwordHash(request.getPassword() != null ? passwordEncoder.encode(request.getPassword()) : null)
                .expiresAt(request.getExpiresInHours() != null
                        ? LocalDateTime.now().plusHours(request.getExpiresInHours())
                        : null)
                .build();

        linkShareRepository.save(linkShare);

        return new LinkShareResponse(
                linkShare.getId(),
                token,
                "/api/public-links/" + token,
                linkShare.getExpiresAt(),
                linkShare.getPasswordHash() != null
        );
    }

    public FileResponse accessLink(String token, AccessLinkRequest request) {
        LinkShare linkShare = linkShareRepository.findByToken(token)
                .orElseThrow(() -> new IllegalArgumentException("Invalid or expired link"));

        if (linkShare.getExpiresAt() != null && linkShare.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("This link has expired");
        }

        if (linkShare.getPasswordHash() != null) {
            if (request == null || request.getPassword() == null
                    || !passwordEncoder.matches(request.getPassword(), linkShare.getPasswordHash())) {
                throw new SecurityException("Incorrect or missing password");
            }
        }

        FileEntity file = linkShare.getFile();
        String downloadUrl = storageService.generateDownloadUrl(file.getStorageKey(), 3600);

        return new FileResponse(file.getId(), file.getName(), file.getSizeBytes(),
                file.getMimeType(), downloadUrl, file.getCreatedAt());
    }

    public void revokeLink(User owner, UUID linkShareId) {
        LinkShare linkShare = linkShareRepository.findById(linkShareId)
                .orElseThrow(() -> new IllegalArgumentException("Link not found"));

        if (!linkShare.getFile().getOwner().getId().equals(owner.getId())) {
            throw new SecurityException("Only the owner can revoke this link");
        }

        linkShareRepository.delete(linkShare);
    }
}