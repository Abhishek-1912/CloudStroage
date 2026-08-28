import api from './api';

export const createShare = (fileId, sharedWithEmail, role) =>
  api.post('/api/shares', { fileId, sharedWithEmail, role });

export const listShares = (fileId) => api.get(`/api/shares/file/${fileId}`);

export const revokeShare = (shareId) => api.delete(`/api/shares/${shareId}`);

export const createLinkShare = (fileId, password, expiresInHours) =>
  api.post('/api/link-shares', { fileId, password: password || null, expiresInHours: expiresInHours || null });