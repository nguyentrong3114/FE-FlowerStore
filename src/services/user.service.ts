import api from '@/lib/api';

export const UserService = {
  getProfile: () => api.get('/me'),
  updateProfile: (data: unknown) => api.put('/me', data),
};
