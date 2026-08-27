package com.cloudstorage.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
public class ShareResponse {
    private UUID id;
    private UUID fileId;
    private String sharedWithEmail;
    private String role;
    private LocalDateTime createdAt;
}