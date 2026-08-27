package com.cloudstorage.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.util.UUID;

@Data
public class CreateFolderRequest {

    @NotBlank
    private String name;

    private UUID parentFolderId; // null = create at root
}