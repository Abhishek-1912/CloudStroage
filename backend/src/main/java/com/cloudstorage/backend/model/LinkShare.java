package com.cloudstorage.backend.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "link_shares")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class LinkShare {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "file_id", nullable = false)
    private FileEntity file;

    @Column(nullable = false, unique = true)
    private String token;

    @Column(name = "password_hash")
    private String passwordHash;

    @Column(name = "expires_at")
    private LocalDateTime expiresAt;
}