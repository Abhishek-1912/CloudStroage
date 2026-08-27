package com.cloudstorage.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.util.UUID;

@Data
public class CompleteUploadRequest {

    @NotBlank
    private String fileName;

    @NotBlank
    private String storageKey;

    private String mimeType;
    private Long sizeBytes;
    private UUID folderId; // optional — null means root
}