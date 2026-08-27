package com.cloudstorage.backend.service;

import com.cloudstorage.backend.model.FileEntity;
import com.cloudstorage.backend.model.Share;
import com.cloudstorage.backend.model.User;
import com.cloudstorage.backend.repository.ShareRepository;
import com.cloudstorage.backend.security.AccessLevel;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FileAccessService {

    private final ShareRepository shareRepository;

    public void requireAccess(User user, FileEntity file, AccessLevel required) {
        if (file.getOwner().getId().equals(user.getId())) {
            return; // owner always has full access
        }

        Share share = shareRepository.findByFileAndSharedWithUser(file, user)
                .orElseThrow(() -> new SecurityException("You don't have access to this file"));

        AccessLevel granted = AccessLevel.valueOf(share.getRole());

        if (granted.ordinal() < required.ordinal()) {
            throw new SecurityException("Your role (" + granted + ") doesn't permit this action");
        }
    }
}