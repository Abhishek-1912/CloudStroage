package com.cloudstorage.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class InitUploadRequest {

    @NotBlank
    private String fileName;

    private String mimeType;
}