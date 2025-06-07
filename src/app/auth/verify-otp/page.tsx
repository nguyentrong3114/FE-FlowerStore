'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthService } from '@/services/auth.service';

export default function VerifyOTPPage() {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Email không tồn tại');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await AuthService.verifyOTP(email, otp);
      if (response.data.message === "OTP hợp lệ, bạn có thể đổi mật khẩu.") {
        localStorage.setItem('resetPasswordOTP', otp);
        router.push(`/auth/reset-password?email=${email}`);
      } else {
        setError('Mã OTP không đúng. Vui lòng thử lại.');
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError('Mã OTP không đúng. Vui lòng thử lại.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!email) {
      setError('Email không tồn tại');
      return;
    }

    try {
      await AuthService.resendOTP(email);
      alert('Mã OTP mới đã được gửi đến email của bạn');
    } catch (error: any) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError('Không thể gửi lại mã OTP. Vui lòng thử lại sau.');
      }
    }
  };

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 rounded-lg shadow-lg border">
          <h1 className="text-2xl font-bold text-center text-red-600 mb-4">
            Email không tồn tại
          </h1>
          <button
            onClick={() => router.push('/auth/forgot-password')}
            className="w-full py-2 px-4 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-600"
          >
            Quay lại trang quên mật khẩu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg border">
        <h1 className="text-2xl font-bold text-center mb-2">Xác thực OTP</h1>
        <p className="text-gray-600 text-center mb-6">
          Vui lòng nhập mã OTP đã được gửi đến email của bạn
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Nhập mã OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Đang xử lý...' : 'Xác nhận'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={handleResendOTP}
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            Gửi lại mã OTP
          </button>
        </div>
      </div>
    </div>
  );
} 