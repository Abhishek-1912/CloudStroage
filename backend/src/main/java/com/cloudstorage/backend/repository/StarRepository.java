package com.cloudstorage.backend.repository;

import com.cloudstorage.backend.model.FileEntity;
import com.cloudstorage.backend.model.Star;
import com.cloudstorage.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface StarRepository extends JpaRepository<Star, UUID> {
    Optional<Star> findByUserAndFile(User user, FileEntity file);
    List<Star> findByUser(User user);
}