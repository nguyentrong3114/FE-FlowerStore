'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { AuthService } from '@/services/auth.service';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const loginSchema = z.object({
    email: z.string()
        .email('Email không hợp lệ')
        .min(1, 'Email là bắt buộc'),
    password: z.string()
        .min(1, 'Mật khẩu là bắt buộc')
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const [error, setError] = useState('');
    const [hidePassword, setHidePassword] = useState(true);
    const { setUser } = useAuth();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            const response = await AuthService.login(data.email, data.password);
            setUser(response.data.fullName);
            setError('');
            router.push('/');
        } catch (error) {
            console.error('Đăng nhập thất bại:', error);
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
            }
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:5047/api/session/google';
    };

    const handleFacebookLogin = () => {
        window.location.href = 'http://localhost:5047/api/session/facebook';
    };

    const handleGithubLogin = () => {
        window.location.href = 'http://localhost:5047/api/session/github';
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
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
                    Đăng Nhập
                </motion.h1>

                <div className="space-y-4 mb-6">
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center gap-3 py-2 px-4 rounded-md border hover:bg-gray-50 transition-all duration-300"
                    >
                        <FcGoogle className="text-xl" />
                        <span>Đăng nhập với Google</span>
                    </motion.button>

                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        onClick={handleFacebookLogin}
                        className="w-full flex items-center justify-center gap-3 py-2 px-4 rounded-md border bg-[#1877F2] text-white hover:bg-[#166FE5] transition-all duration-300"
                    >
                        <FaFacebook className="text-xl" />
                        <span>Đăng nhập với Facebook</span>
                    </motion.button>
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        onClick={handleGithubLogin}
                        className="w-full flex items-center justify-cQuenter gap-3 py-2 px-4 rounded-md border bg-[#181717] text-white hover:bg-[#000000] transition-all duration-300"
                    >
                        <FaGithub className="text-xl" />
                        <span>Đăng nhập với Github</span>
                    </motion.button>
                </div>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t"></div>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
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
                        transition={{ delay: 0.6 }}
                    >
                        <label htmlFor="password" className="block text-sm font-medium mb-2">
                            Mật khẩu
                        </label>
                        <div className='relative'>
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
                        <div className="mt-2 text-right">
                            <Link 
                                href="/auth/forgot-password" 
                                className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                            >
                                Quên mật khẩu?
                            </Link>
                        </div>
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
                        transition={{ delay: 0.7 }}
                    >
                        <div className='flex justify-center'>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-1/2 py-2 px-4 rounded-md font-medium transition-all duration-300 hover:scale-105 border ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {isSubmitting ? 'Đang xử lý...' : 'Đăng Nhập'}
                            </button>
                        </div>
                    </motion.div>
                </form>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-6 text-center"
                >
                    <p className="text-sm">
                        Chưa có tài khoản?{' '}
                        <Link href="/auth/register" className="font-medium hover:underline">
                            Đăng ký ngay
                        </Link>
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
}