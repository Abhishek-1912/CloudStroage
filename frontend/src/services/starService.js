import api from './api';

export const starFile = (fileId) => api.post(`/api/stars/${fileId}`);
export const unstarFile = (fileId) => api.delete(`/api/stars/${fileId}`);
export const getStarred = () => api.get('/api/stars');