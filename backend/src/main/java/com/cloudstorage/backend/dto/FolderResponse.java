package com.cloudstorage.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
public class FolderResponse {
    private UUID id;
    private String name;
    private UUID parentFolderId;
    private LocalDateTime createdAt;
}