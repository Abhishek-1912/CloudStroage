package com.cloudstorage.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.List;

@Data
@AllArgsConstructor
public class SearchResponse {
    private List<FolderResponse> folders;
    private List<FileResponse> files;
    private int page;
    private int size;
    private long totalFolders;
    private long totalFiles;
}