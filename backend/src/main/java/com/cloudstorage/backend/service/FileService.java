package com.cloudstorage.backend.service;

import com.cloudstorage.backend.dto.*;
import com.cloudstorage.backend.model.FileEntity;
import com.cloudstorage.backend.model.Folder;
import com.cloudstorage.backend.model.User;
import com.cloudstorage.backend.repository.FileRepository;
import com.cloudstorage.backend.repository.FolderRepository;
import com.cloudstorage.backend.security.AccessLevel;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileService {

    private final FileRepository fileRepository;
    private final FolderRepository folderRepository;
    private final StorageService storageService;
    private final FileAccessService fileAccessService;

    public InitUploadResponse initUpload(User owner, InitUploadRequest request) {
        String storageKey = owner.getId() + "/" + UUID.randomUUID() + "_" + request.getFileName();
        String uploadUrl = storageService.generateUploadUrl(storageKey);
        return new InitUploadResponse(uploadUrl, storageKey);
    }

    public FileResponse completeUpload(User owner, CompleteUploadRequest request) {
        Folder folder = null;
        if (request.getFolderId() != null) {
            folder = folderRepository.findById(request.getFolderId())
                    .orElseThrow(() -> new IllegalArgumentException("Folder not found"));
        }

        FileEntity file = FileEntity.builder()
                .owner(owner)
                .folder(folder)
                .name(request.getFileName())
                .storageKey(request.getStorageKey())
                .sizeBytes(request.getSizeBytes())
                .mimeType(request.getMimeType())
                .trashed(false)
                .build();

        fileRepository.save(file);
        return toResponse(file);
    }

    public FileResponse getFile(User requester, UUID fileId) {
        FileEntity file = findFileOrThrow(fileId);
        fileAccessService.requireAccess(requester, file, AccessLevel.VIEWER);
        return toResponse(file);
    }

    public FileResponse renameFile(User requester, UUID fileId, String newName) {
        FileEntity file = findFileOrThrow(fileId);
        fileAccessService.requireAccess(requester, file, AccessLevel.EDITOR);
        file.setName(newName);
        fileRepository.save(file);
        return toResponse(file);
    }

    public FileResponse moveFile(User requester, UUID fileId, UUID targetFolderId) {
        FileEntity file = findFileOrThrow(fileId);
        fileAccessService.requireAccess(requester, file, AccessLevel.EDITOR);

        Folder target = null;
        if (targetFolderId != null) {
            target = folderRepository.findById(targetFolderId)
                    .orElseThrow(() -> new IllegalArgumentException("Folder not found"));
        }
        file.setFolder(target);
        fileRepository.save(file);
        return toResponse(file);
    }

    public void trashFile(User requester, UUID fileId) {
        FileEntity file = findFileOrThrow(fileId);
        fileAccessService.requireAccess(requester, file, AccessLevel.EDITOR);
        file.setTrashed(true);
        fileRepository.save(file);
    }

    public void restoreFile(User requester, UUID fileId) {
        FileEntity file = findFileOrThrow(fileId);
        fileAccessService.requireAccess(requester, file, AccessLevel.EDITOR);
        file.setTrashed(false);
        fileRepository.save(file);
    }

    public void deleteFile(User requester, UUID fileId) {
        FileEntity file = findFileOrThrow(fileId);
        fileAccessService.requireAccess(requester, file, AccessLevel.EDITOR);
        storageService.deleteFile(file.getStorageKey());
        fileRepository.delete(file);
    }

    private FileEntity findFileOrThrow(UUID fileId) {
        return fileRepository.findById(fileId)
                .orElseThrow(() -> new IllegalArgumentException("File not found"));
    }

    private FileResponse toResponse(FileEntity file) {
        String downloadUrl = storageService.generateDownloadUrl(file.getStorageKey(), 3600);
        return new FileResponse(file.getId(), file.getName(), file.getSizeBytes(),
                file.getMimeType(), downloadUrl, file.getCreatedAt());
    }
}