import api from '@/lib/api';

export const UserService = {
  updateProfile: (data: unknown) => api.put('/me', data),
  register: (data: { name: string, email: string; password: string }) =>
    api.post('/users', data),
  getMe: () => api.get('/users/me'),
  changePassword: (data: { oldPassword: string, newPassword: string }) => api.put('/users/me/password', data),
};
