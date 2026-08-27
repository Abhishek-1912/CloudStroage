package com.cloudstorage.backend.repository;

import com.cloudstorage.backend.model.FileEntity;
import com.cloudstorage.backend.model.Folder;
import com.cloudstorage.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface FileRepository extends JpaRepository<FileEntity, UUID> {
    List<FileEntity> findByOwnerAndFolderAndTrashedFalse(User owner, Folder folder);
    List<FileEntity> findByOwnerAndFolderIsNullAndTrashedFalse(User owner);
    List<FileEntity> findByOwnerAndTrashedTrue(User owner);
}