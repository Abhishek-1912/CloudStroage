package com.cloudstorage.backend.service;

import com.cloudstorage.backend.dto.CreateShareRequest;
import com.cloudstorage.backend.dto.ShareResponse;
import com.cloudstorage.backend.model.FileEntity;
import com.cloudstorage.backend.model.Share;
import com.cloudstorage.backend.model.User;
import com.cloudstorage.backend.repository.FileRepository;
import com.cloudstorage.backend.repository.ShareRepository;
import com.cloudstorage.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ShareService {

    private final ShareRepository shareRepository;
    private final FileRepository fileRepository;
    private final UserRepository userRepository;

    public ShareResponse createShare(User owner, CreateShareRequest request) {
        FileEntity file = fileRepository.findById(request.getFileId())
                .orElseThrow(() -> new IllegalArgumentException("File not found"));

        if (!file.getOwner().getId().equals(owner.getId())) {
            throw new SecurityException("Only the owner can share this file");
        }

        User targetUser = userRepository.findByEmail(request.getSharedWithEmail())
                .orElseThrow(() -> new IllegalArgumentException("No user with that email"));

        if (targetUser.getId().equals(owner.getId())) {
            throw new IllegalArgumentException("Cannot share a file with yourself");
        }

        String role = request.getRole().toUpperCase();
        if (!role.equals("VIEWER") && !role.equals("EDITOR")) {
            throw new IllegalArgumentException("Role must be VIEWER or EDITOR");
        }

        Share share = Share.builder()
                .file(file)
                .sharedWithUser(targetUser)
                .role(role)
                .build();

        shareRepository.save(share);
        return toResponse(share);
    }

    public List<ShareResponse> listShares(User owner, UUID fileId) {
        FileEntity file = fileRepository.findById(fileId)
                .orElseThrow(() -> new IllegalArgumentException("File not found"));

        if (!file.getOwner().getId().equals(owner.getId())) {
            throw new SecurityException("Only the owner can view shares");
        }

        return shareRepository.findByFile(file).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public void revokeShare(User owner, UUID shareId) {
        Share share = shareRepository.findById(shareId)
                .orElseThrow(() -> new IllegalArgumentException("Share not found"));

        if (!share.getFile().getOwner().getId().equals(owner.getId())) {
            throw new SecurityException("Only the owner can revoke shares");
        }

        shareRepository.delete(share);
    }

    private ShareResponse toResponse(Share share) {
        return new ShareResponse(
                share.getId(),
                share.getFile().getId(),
                share.getSharedWithUser().getEmail(),
                share.getRole(),
                share.getCreatedAt()
        );
    }
}