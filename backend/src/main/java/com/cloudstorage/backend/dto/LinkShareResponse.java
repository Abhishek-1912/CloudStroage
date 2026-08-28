package com.cloudstorage.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
public class LinkShareResponse {
    private UUID id;
    private String token;
    private String publicUrl;
    private LocalDateTime expiresAt;
    private boolean passwordProtected;
}