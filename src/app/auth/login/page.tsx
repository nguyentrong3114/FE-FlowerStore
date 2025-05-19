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
export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [hidePassword, setHidePassword] = useState(true);
    const { setUser } = useAuth();
    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await AuthService.login(email, password);
            console.log(response.data);
            setUser(response.data.fullName);
            setError('');
            router.push('/');
        } catch (error: any) {
            console.error('Đăng nhập thất bại:', error);
            setError(error.response?.data?.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
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
                        className="w-full flex items-center justify-center gap-3 py-2 px-4 rounded-md border bg-[#181717] text-white hover:bg-[#000000] transition-all duration-300"
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

                <form onSubmit={handleSubmit} className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2"
                            required
                        />
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
                                type={hidePassword ? 'password' : 'text'}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2"
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                onClick={() => setHidePassword(!hidePassword)}
                            >
                                {hidePassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
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
                                className="w-1/2 py-2 px-4 rounded-md font-medium transition-all duration-300 hover:scale-105 border"
                            >
                                Đăng Nhập
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
