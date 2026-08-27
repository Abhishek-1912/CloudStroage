package com.cloudstorage.backend.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "file_versions")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class FileVersion {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "file_id", nullable = false)
    private FileEntity file;

    @Column(name = "version_number", nullable = false)
    private int versionNumber;

    @Column(name = "storage_key", nullable = false)
    private String storageKey;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}