package com.cloudstorage.backend.service;

import com.cloudstorage.backend.config.SupabaseProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class StorageService {

    private final RestTemplate restTemplate;
    private final SupabaseProperties supabaseProperties;

    /**
     * Asks Supabase for a temporary signed URL the client can PUT the file bytes to directly.
     * storageKey is the path inside the bucket, e.g. "userId/uuid-filename.pdf"
     */
    public String generateUploadUrl(String storageKey) {
        String endpoint = supabaseProperties.getUrl() + "/storage/v1/object/upload/sign/"
                + supabaseProperties.getBucket() + "/" + storageKey;

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(supabaseProperties.getServiceKey());
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> request = new HttpEntity<>("{}", headers);
        
        Map<?, ?> response = restTemplate.postForObject(endpoint, request, Map.class);
        String token = (String) response.get("token");

        return supabaseProperties.getUrl() + "/storage/v1/object/upload/sign/"
                + supabaseProperties.getBucket() + "/" + storageKey + "?token=" + token;
    }

    /**
     * Asks Supabase for a temporary signed URL to download/view the file. Expires in given seconds.
     */
    public String generateDownloadUrl(String storageKey, int expiresInSeconds) {
        String endpoint = supabaseProperties.getUrl() + "/storage/v1/object/sign/"
                + supabaseProperties.getBucket() + "/" + storageKey;

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(supabaseProperties.getServiceKey());
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Integer>> request = new HttpEntity<>(
                Map.of("expiresIn", expiresInSeconds), headers
        );

        Map<?, ?> response = restTemplate.postForObject(endpoint, request, Map.class);
        String signedPath = (String) response.get("signedURL");

        return supabaseProperties.getUrl() + "/storage/v1" + signedPath;
    }

    /**
     * Deletes an object from the bucket.
     */
    public void deleteFile(String storageKey) {
        String endpoint = supabaseProperties.getUrl() + "/storage/v1/object/"
                + supabaseProperties.getBucket() + "/" + storageKey;

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(supabaseProperties.getServiceKey());

        HttpEntity<Void> request = new HttpEntity<>(headers);
        restTemplate.exchange(endpoint, org.springframework.http.HttpMethod.DELETE, request, Void.class);
    }
}