package com.cloudstorage.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.util.UUID;

@Data
public class CreateShareRequest {

    private UUID fileId;

    @Email
    @NotBlank
    private String sharedWithEmail;

    @NotBlank
    private String role; // "VIEWER" or "EDITOR"
}