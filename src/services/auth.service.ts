import api from '@/lib/api';

export const AuthService = {
  login: (email: string, password: string) => {
    return api.post(
      '/session',
      { email, password },
      {
        withCredentials: true
      }
    );
  },
  isLogin: () => api.get('/session', { withCredentials: true }),
  logout: () => api.delete('/session', { withCredentials: true }),
  verifyOTP: (email: string, otp: string) => api.post('/users/me/verify', { email, otp }, { withCredentials: true }),
  resendOTP: (email: string) => api.post('/users/me/send-otp', { email }, { withCredentials: true }),
};
