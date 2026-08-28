import api from './api';

export const search = (query, page = 0, size = 20) =>
  api.get('/api/search', { params: { query, page, size } });