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
  verifyOTP: (email: string, otp: string) => api.post('/session/verify-otp', { email, otp }),
  resendOTP: (email: string) => api.post('/session/forgot-password', { email }),

  // Quên mật khẩu
  forgotPassword: (email: string) => {
    return api.post('/session/forgot-password', { email });
  },

  // Đặt lại mật khẩu
  resetPassword: (email: string, newPassword: string, otp: string) => {
    return api.post('/session/reset-password', { email, newPassword, otp });
  },

  // Kiểm tra token reset password có hợp lệ không
  verifyResetToken: (token: string) => {
    return api.get(`/session/verify-otp/${token}`);
  }
};
