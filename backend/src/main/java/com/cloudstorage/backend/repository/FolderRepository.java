package com.cloudstorage.backend.repository;

import com.cloudstorage.backend.model.Folder;
import com.cloudstorage.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface FolderRepository extends JpaRepository<Folder, UUID> {
    List<Folder> findByOwnerAndParentFolderAndTrashedFalse(User owner, Folder parentFolder);
    List<Folder> findByOwnerAndParentFolderIsNullAndTrashedFalse(User owner);
    List<Folder> findByOwnerAndTrashedTrue(User owner);
        org.springframework.data.domain.Page<Folder> findByOwnerAndTrashedFalseAndNameContainingIgnoreCase(
            User owner, String name, org.springframework.data.domain.Pageable pageable);
}