package com.cloudstorage.backend.repository;

import com.cloudstorage.backend.model.FileEntity;
import com.cloudstorage.backend.model.Share;
import com.cloudstorage.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ShareRepository extends JpaRepository<Share, UUID> {
    List<Share> findByFile(FileEntity file);
    Optional<Share> findByFileAndSharedWithUser(FileEntity file, User sharedWithUser);

        List<Share> findBySharedWithUser(User sharedWithUser);
}