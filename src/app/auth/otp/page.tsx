"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/services/auth.service";

export default function OTPPage() {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [isResending, setIsResending] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await AuthService.verifyOTP(email, otp);
            router.push("/auth/login");
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Có lỗi xảy ra khi xác thực OTP");
            }
        }
    };

    const handleResendOTP = async () => {
        setIsResending(true);
        try {
            await AuthService.resendOTP(email);
            setError("");
            alert("Đã gửi lại mã OTP thành công!");
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Có lỗi xảy ra khi gửi lại OTP");
            }
        } finally {
            setIsResending(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Xác thực OTP
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Vui lòng nhập mã OTP đã được gửi đến email của bạn
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Nhập email của bạn"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="otp" className="sr-only">
                                Mã OTP
                            </label>
                            <input
                                id="otp"
                                name="otp"
                                type="text"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Nhập mã OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                maxLength={6}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <div className="flex flex-col space-y-3">
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Xác nhận
                        </button>

                        <button
                            type="button"
                            onClick={handleResendOTP}
                            disabled={isResending}
                            className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {isResending ? "Đang gửi lại..." : "Gửi lại mã OTP"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
