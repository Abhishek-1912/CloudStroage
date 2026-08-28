package com.cloudstorage.backend.dto;

import lombok.Data;

@Data
public class AccessLinkRequest {
    private String password; // only needed if the link is password protected
}