import api from './api';

export const trashFile = (fileId) => api.post(`/api/files/${fileId}/trash`);
export const renameFile = (fileId, newName) =>
  api.patch(`/api/files/${fileId}/rename`, { newName });