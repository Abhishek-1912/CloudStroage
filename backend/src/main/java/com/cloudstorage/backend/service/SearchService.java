package com.cloudstorage.backend.service;

import com.cloudstorage.backend.dto.FileResponse;
import com.cloudstorage.backend.dto.FolderResponse;
import com.cloudstorage.backend.dto.SearchResponse;
import com.cloudstorage.backend.model.FileEntity;
import com.cloudstorage.backend.model.Folder;
import com.cloudstorage.backend.model.User;
import com.cloudstorage.backend.repository.FileRepository;
import com.cloudstorage.backend.repository.FolderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SearchService {

    private final FileRepository fileRepository;
    private final FolderRepository folderRepository;
    private final StorageService storageService;

    public SearchResponse search(User owner, String query, int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size);

        Page<FileEntity> filePage = fileRepository
                .findByOwnerAndTrashedFalseAndNameContainingIgnoreCase(owner, query, pageRequest);
        Page<Folder> folderPage = folderRepository
                .findByOwnerAndTrashedFalseAndNameContainingIgnoreCase(owner, query, pageRequest);

        List<FileResponse> files = filePage.getContent().stream()
                .map(f -> new FileResponse(f.getId(), f.getName(), f.getSizeBytes(), f.getMimeType(),
                        storageService.generateDownloadUrl(f.getStorageKey(), 3600), f.getCreatedAt()))
                .collect(Collectors.toList());

        List<FolderResponse> folders = folderPage.getContent().stream()
                .map(f -> new FolderResponse(f.getId(), f.getName(),
                        f.getParentFolder() != null ? f.getParentFolder().getId() : null, f.getCreatedAt()))
                .collect(Collectors.toList());

        return new SearchResponse(folders, files, page, size,
                folderPage.getTotalElements(), filePage.getTotalElements());
    }
}