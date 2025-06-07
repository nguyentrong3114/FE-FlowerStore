'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { UserService } from '@/services/user.service';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';

const registerSchema = z.object({
    fullName: z.string()
        .regex(/^[\p{L}\s]+$/u, 'Họ và tên không được chứa ký tự đặc biệt')
        .min(2, 'Họ và tên phải có ít nhất 2 ký tự')
        .max(50, 'Họ và tên không được vượt quá 50 ký tự'),
    email: z.string()
        .email('Email không hợp lệ')
        .min(1, 'Email là bắt buộc'),
    password: z.string()
        .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số'),
    confirmPassword: z.string()
}).superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Mật khẩu xác nhận không khớp",
            path: ["confirmPassword"]
        });
    }
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    });

    const handleError = (error: unknown) => {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status;
            const message = error.response?.data?.message;

            switch (status) {
                case 400:
                    setError('Thông tin đăng ký không hợp lệ');
                    break;
                case 409:
                    setError('Email này đã được sử dụng');
                    break;
                case 422:
                    setError('Dữ liệu không hợp lệ. Vui lòng kiểm tra lại thông tin');
                    break;
                case 429:
                    setError('Quá nhiều yêu cầu đăng ký. Vui lòng thử lại sau');
                    break;
                case 500:
                    setError('Lỗi máy chủ. Vui lòng thử lại sau');
                    break;
                default:
                    setError(message || 'Đăng ký thất bại. Vui lòng thử lại');
            }
        } else {
            setError('Đã xảy ra lỗi không xác định. Vui lòng thử lại');
        }
    };

    const onSubmit = async (data: RegisterFormData) => {
        setError('');
        setSuccessMessage('');
        setIsLoading(true);
        
        try {
            const response = await UserService.register({
                name: data.fullName,
                email: data.email,
                password: data.password
            });

            if (response.status === 200) {
                setSuccessMessage('Đăng ký thành công! Đang chuyển hướng...');
                setTimeout(() => {
                    router.push('/auth/otp');
                }, 2000);
            }
        } catch (error) {
            handleError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 mt-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md p-8 rounded-lg shadow-lg border"
            >
                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl font-bold text-center mb-8"
                >
                    Đăng Ký
                </motion.h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <label htmlFor="fullName" className="block text-sm font-medium mb-2">
                            Họ và tên
                        </label>
                        <input
                            {...register('fullName')}
                            type="text"
                            id="fullName"
                            className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2"
                        />
                        {errors.fullName && (
                            <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                        )}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                            Email
                        </label>
                        <input
                            {...register('email')}
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 }}
                    >
                        <label htmlFor="password" className="block text-sm font-medium mb-2">
                            Mật khẩu
                        </label>
                        <input
                            {...register('password')}
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                            Xác nhận mật khẩu
                        </label>
                        <input
                            {...register('confirmPassword')}
                            type="password"
                            id="confirmPassword"
                            className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2"
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                        )}
                    </motion.div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm text-center"
                        >
                            {error}
                        </motion.div>
                    )}

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                    >
                        <div className='flex justify-center'>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-1/2 py-2 px-4 rounded-md font-medium transition-all duration-300 hover:scale-105 border ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {isLoading ? 'Đang xử lý...' : 'Đăng Ký'}
                            </button>
                        </div>
                    </motion.div>

                    {successMessage && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-sm text-center"
                        >
                            {successMessage}
                        </motion.div>
                    )}
                </form>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-6 text-center"
                >
                    <p className="text-sm">
                        Đã có tài khoản?{' '}
                        <Link href="/auth/login" className="font-medium hover:underline">
                            Đăng nhập ngay
                        </Link>
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
}
