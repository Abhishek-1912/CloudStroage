package com.cloudstorage.backend.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "folders", indexes = {
        @Index(name = "idx_folders_owner", columnList = "owner_id"),
        @Index(name = "idx_folders_owner_trashed", columnList = "owner_id, is_trashed"),
        @Index(name = "idx_folders_name", columnList = "name")
})
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class Folder {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_folder_id")
    private Folder parentFolder;

    @Column(nullable = false)
    private String name;

    @Column(name = "is_trashed", nullable = false)
    private boolean trashed = false;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}