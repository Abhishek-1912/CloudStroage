package com.cloudstorage.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
public class FileResponse {
    private UUID id;
    private String name;
    private Long sizeBytes;
    private String mimeType;
    private String downloadUrl;
    private LocalDateTime createdAt;
}