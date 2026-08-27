package com.cloudstorage.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.List;

@Data
@AllArgsConstructor
public class FolderContentsResponse {
    private FolderResponse currentFolder; // null if root
    private List<FolderResponse> folders;
    private List<FileResponse> files;
}