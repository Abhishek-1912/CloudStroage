import api from './api';

export const getRootContents = () => api.get('/api/folders/root');
export const getFolderContents = (folderId) => api.get(`/api/folders/${folderId}`);
export const createFolder = (name, parentFolderId) =>
  api.post('/api/folders', { name, parentFolderId });
export const renameFolder = (folderId, newName) =>
  api.patch(`/api/folders/${folderId}/rename`, { newName });
export const trashFolder = (folderId) => api.delete(`/api/folders/${folderId}`);;

