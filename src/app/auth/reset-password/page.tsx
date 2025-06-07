'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useSearchParams, useRouter } from 'next/navigation';
import { AuthService } from '@/services/auth.service';

const resetPasswordSchema = z.object({
    password: z.string()
        .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
        .regex(/[A-Z]/, 'Mật khẩu phải chứa ít nhất 1 chữ hoa')
        .regex(/[a-z]/, 'Mật khẩu phải chứa ít nhất 1 chữ thường')
        .regex(/[0-9]/, 'Mật khẩu phải chứa ít nhất 1 số'),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
    const [hidePassword, setHidePassword] = useState(true);
    const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
    const [error, setError] = useState<string>('');
    const searchParams = useSearchParams();
    const router = useRouter();
    const email = searchParams.get('email');

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordSchema),
    });

    useEffect(() => {
        // Kiểm tra xem có OTP trong localStorage không
        const otp = localStorage.getItem('resetPasswordOTP');
        if (!otp) {
            router.push('/auth/forgot-password');
        }
    }, [router]);

    const onSubmit = async (data: ResetPasswordFormData) => {
        if (!email) {
            setError('Email không tồn tại');
            return;
        }

        const otp = localStorage.getItem('resetPasswordOTP');
        if (!otp) {
            setError('Phiên làm việc đã hết hạn. Vui lòng thử lại.');
            return;
        }
        
        try {
            await AuthService.resetPassword(email, data.password, otp);
            localStorage.removeItem('resetPasswordOTP');
            alert('Đặt lại mật khẩu thành công!');
            router.push('/auth/login');
        } catch (error: any) {
            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else {
                setError('Có lỗi xảy ra. Vui lòng thử lại sau.');
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
                <h1 className="text-2xl font-bold text-center mb-6">
                    Đặt lại mật khẩu
                </h1>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium mb-2">
                            Mật khẩu mới
                        </label>
                        <div className="relative">
                            <input
                                {...register('password')}
                                type={hidePassword ? 'password' : 'text'}
                                id="password"
                                className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2"
                            />
                            <button
                                type="button"
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                onClick={() => setHidePassword(!hidePassword)}
                            >
                                {hidePassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                            Xác nhận mật khẩu
                        </label>
                        <div className="relative">
                            <input
                                {...register('confirmPassword')}
                                type={hideConfirmPassword ? 'password' : 'text'}
                                id="confirmPassword"
                                className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2"
                            />
                            <button
                                type="button"
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                onClick={() => setHideConfirmPassword(!hideConfirmPassword)}
                            >
                                {hideConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-2 px-4 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Đang xử lý...' : 'Đặt lại mật khẩu'}
                    </button>
                </form>
            </div>
        </div>
    );
}
