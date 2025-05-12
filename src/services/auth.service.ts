import api from '@/lib/api';

export const AuthService = {
  login: (email: string, password: string) =>
    api.post('/login', { email, password }),

  register: (data: { email: string; password: string }) =>
    api.post('/register', data),

  logout: () => api.post('/logout'),
};
