package com.cloudstorage.backend.repository;

import com.cloudstorage.backend.model.LinkShare;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.UUID;

public interface LinkShareRepository extends JpaRepository<LinkShare, UUID> {
    Optional<LinkShare> findByToken(String token);
}