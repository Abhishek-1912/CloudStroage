package com.cloudstorage.backend.service;

import com.cloudstorage.backend.dto.*;
import com.cloudstorage.backend.model.FileEntity;
import com.cloudstorage.backend.model.Folder;
import com.cloudstorage.backend.model.User;
import com.cloudstorage.backend.repository.FileRepository;
import com.cloudstorage.backend.repository.FolderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FolderService {

    private final FolderRepository folderRepository;
    private final FileRepository fileRepository;
    private final StorageService storageService;

    public FolderResponse createFolder(User owner, CreateFolderRequest request) {
        Folder parent = null;
        if (request.getParentFolderId() != null) {
            parent = getOwnedFolder(owner, request.getParentFolderId());
        }

        Folder folder = Folder.builder()
                .owner(owner)
                .parentFolder(parent)
                .name(request.getName())
                .trashed(false)
                .build();

        folderRepository.save(folder);
        return toResponse(folder);
    }

    public FolderContentsResponse getContents(User owner, UUID folderId) {
        Folder current = null;
        List<Folder> subfolders;
        List<FileEntity> files;

        if (folderId == null) {
            subfolders = folderRepository.findByOwnerAndParentFolderIsNullAndTrashedFalse(owner);
            files = fileRepository.findByOwnerAndFolderIsNullAndTrashedFalse(owner);
        } else {
            current = getOwnedFolder(owner, folderId);
            subfolders = folderRepository.findByOwnerAndParentFolderAndTrashedFalse(owner, current);
            files = fileRepository.findByOwnerAndFolderAndTrashedFalse(owner, current);
        }

        List<FolderResponse> folderResponses = subfolders.stream()
                .map(this::toResponse).collect(Collectors.toList());

        List<FileResponse> fileResponses = files.stream()
                .map(f -> new FileResponse(f.getId(), f.getName(), f.getSizeBytes(), f.getMimeType(),
                        storageService.generateDownloadUrl(f.getStorageKey(), 3600), f.getCreatedAt()))
                .collect(Collectors.toList());

        return new FolderContentsResponse(
                current != null ? toResponse(current) : null,
                folderResponses,
                fileResponses
        );
    }

    public FolderResponse renameFolder(User owner, UUID folderId, String newName) {
        Folder folder = getOwnedFolder(owner, folderId);
        folder.setName(newName);
        folderRepository.save(folder);
        return toResponse(folder);
    }

    public FolderResponse moveFolder(User owner, UUID folderId, UUID targetFolderId) {
        Folder folder = getOwnedFolder(owner, folderId);
        Folder target = targetFolderId != null ? getOwnedFolder(owner, targetFolderId) : null;

        if (target != null && target.getId().equals(folder.getId())) {
            throw new IllegalArgumentException("Cannot move a folder into itself");
        }

        folder.setParentFolder(target);
        folderRepository.save(folder);
        return toResponse(folder);
    }

    public void trashFolder(User owner, UUID folderId) {
        Folder folder = getOwnedFolder(owner, folderId);
        folder.setTrashed(true);
        folderRepository.save(folder);
    }

    public void restoreFolder(User owner, UUID folderId) {
        Folder folder = folderRepository.findById(folderId)
                .orElseThrow(() -> new IllegalArgumentException("Folder not found"));
        assertOwnership(owner, folder);
        folder.setTrashed(false);
        folderRepository.save(folder);
    }

    private Folder getOwnedFolder(User owner, UUID folderId) {
        Folder folder = folderRepository.findById(folderId)
                .orElseThrow(() -> new IllegalArgumentException("Folder not found"));
        assertOwnership(owner, folder);
        return folder;
    }

    private void assertOwnership(User owner, Folder folder) {
        if (!folder.getOwner().getId().equals(owner.getId())) {
            throw new SecurityException("Not authorized to access this folder");
        }
    }

    private FolderResponse toResponse(Folder folder) {
        return new FolderResponse(
                folder.getId(),
                folder.getName(),
                folder.getParentFolder() != null ? folder.getParentFolder().getId() : null,
                folder.getCreatedAt()
        );
    }
}