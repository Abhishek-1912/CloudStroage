package com.cloudstorage.backend.service;

import com.cloudstorage.backend.dto.FileResponse;
import com.cloudstorage.backend.model.FileEntity;
import com.cloudstorage.backend.model.Star;
import com.cloudstorage.backend.model.User;
import com.cloudstorage.backend.repository.FileRepository;
import com.cloudstorage.backend.repository.StarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StarService {

    private final StarRepository starRepository;
    private final FileRepository fileRepository;
    private final StorageService storageService;

    public void star(User user, UUID fileId) {
        FileEntity file = fileRepository.findById(fileId)
                .orElseThrow(() -> new IllegalArgumentException("File not found"));

        if (starRepository.findByUserAndFile(user, file).isPresent()) {
            return; // already starred, no-op
        }

        Star star = Star.builder().user(user).file(file).build();
        starRepository.save(star);
    }

    public void unstar(User user, UUID fileId) {
        FileEntity file = fileRepository.findById(fileId)
                .orElseThrow(() -> new IllegalArgumentException("File not found"));

        starRepository.findByUserAndFile(user, file)
                .ifPresent(starRepository::delete);
    }

    public List<FileResponse> listStarred(User user) {
        return starRepository.findByUser(user).stream()
                .map(s -> {
                    FileEntity f = s.getFile();
                    String downloadUrl = storageService.generateDownloadUrl(f.getStorageKey(), 3600);
                    return new FileResponse(f.getId(), f.getName(), f.getSizeBytes(),
                            f.getMimeType(), downloadUrl, f.getCreatedAt());
                })
                .collect(Collectors.toList());
    }
}