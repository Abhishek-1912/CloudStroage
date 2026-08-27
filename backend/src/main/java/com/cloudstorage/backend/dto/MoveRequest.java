package com.cloudstorage.backend.dto;

import lombok.Data;
import java.util.UUID;

@Data
public class MoveRequest {
    private UUID targetFolderId; // null = move to root
}