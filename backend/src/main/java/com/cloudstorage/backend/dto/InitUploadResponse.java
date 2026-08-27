package com.cloudstorage.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class InitUploadResponse {
    private String uploadUrl;
    private String storageKey;
}