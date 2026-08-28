package com.cloudstorage.backend.dto;

import lombok.Data;
import java.util.UUID;

@Data
public class CreateLinkShareRequest {
    private UUID fileId;
    private String password;      // optional, null = no password
    private Integer expiresInHours; // optional, null = never expires
}