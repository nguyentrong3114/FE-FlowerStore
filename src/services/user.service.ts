import api from '@/lib/api';

export const UserService = {
  updateProfile: (data: unknown) => api.put('/me', data),
  register: (data: {name: string, email: string; password: string }) =>
    api.post('/users', data),

};
