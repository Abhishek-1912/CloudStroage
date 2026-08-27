package com.cloudstorage.backend.controller;

import com.cloudstorage.backend.dto.FileResponse;
import com.cloudstorage.backend.dto.FolderResponse;
import com.cloudstorage.backend.dto.TrashResponse;
import com.cloudstorage.backend.model.User;
import com.cloudstorage.backend.repository.FileRepository;
import com.cloudstorage.backend.repository.FolderRepository;
import com.cloudstorage.backend.repository.UserRepository;
import com.cloudstorage.backend.service.StorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/trash")
@RequiredArgsConstructor
public class TrashController {

    private final FolderRepository folderRepository;
    private final FileRepository fileRepository;
    private final UserRepository userRepository;
    private final StorageService storageService;

    @GetMapping
    public ResponseEntity<TrashResponse> getTrash(Authentication authentication) {
        User owner = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        List<FolderResponse> folders = folderRepository.findByOwnerAndTrashedTrue(owner).stream()
                .map(f -> new FolderResponse(f.getId(), f.getName(),
                        f.getParentFolder() != null ? f.getParentFolder().getId() : null, f.getCreatedAt()))
                .collect(Collectors.toList());

        List<FileResponse> files = fileRepository.findByOwnerAndTrashedTrue(owner).stream()
                .map(f -> new FileResponse(f.getId(), f.getName(), f.getSizeBytes(), f.getMimeType(),
                        storageService.generateDownloadUrl(f.getStorageKey(), 3600), f.getCreatedAt()))
                .collect(Collectors.toList());

        return ResponseEntity.ok(new TrashResponse(folders, files));
    }
}