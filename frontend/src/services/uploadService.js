import api from './api';
import axios from 'axios';

export const initUpload = (fileName, mimeType) =>
  api.post('/api/files/init-upload', { fileName, mimeType });

export const completeUpload = (fileName, storageKey, mimeType, sizeBytes, folderId) =>
  api.post('/api/files/complete-upload', { fileName, storageKey, mimeType, sizeBytes, folderId });

// Uploads directly to the signed Supabase URL — NOT through our backend,
// and NOT through the `api` instance (no JWT needed here, the signed URL carries its own auth).
export const uploadToSignedUrl = (uploadUrl, file, onProgress) =>
  axios.put(uploadUrl, file, {
    headers: { 'Content-Type': file.type || 'application/octet-stream' },
    onUploadProgress: (event) => {
      if (onProgress) {
        const percent = Math.round((event.loaded * 100) / event.total);
        onProgress(percent);
      }
    },
  });