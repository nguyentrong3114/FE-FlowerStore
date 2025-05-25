"use client"

import { CartService } from "@/services/cart.service"
import { paymentService } from "@/services/payment.service"
import { useEffect, useState } from "react"

interface CartItem {
    productVariantId: number
    productName: string
    price: number
    quantity: number
    imageUrl: string
    size: string
    totalPrice: number
}
interface PaymentDetailDTO {
    productVariantId: number
    quantity: number
    price: number
}

interface CreatePaymentRequestDTO {
    payment: {
        method: string
        fullName: string
        email: string
        address: string
        amount: number
        shippingFee: number
    },
    items: PaymentDetailDTO[]
}
export default function PaymentPage() {
    const [cart, setCart] = useState<CartItem[]>([])
    const [totalAmount, setTotalAmount] = useState(0)
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        method: "cod"
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        const loadCartItems = async () => {
            try {
                const response = await CartService.getCartItems();
                const items = response.cartItems || response.data || [];
                setCart(items);

                const total = items.reduce((sum: number, item: CartItem) => {
                    return sum + item.price * item.quantity
                }, 0);

                setTotalAmount(total);
            } catch (error) {
                // Nếu API lỗi hoặc chưa đăng nhập, lấy từ localStorage
                const localData = localStorage.getItem("local-cart");
                if (localData) {
                    const items = JSON.parse(localData);
                    setCart(items);
                    
                    const total = items.reduce((sum: number, item: CartItem) => {
                        return sum + item.price * item.quantity
                    }, 0);

                    setTotalAmount(total);
                }
            }
        };

        loadCartItems();
    }, []);

    const handleChange = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const payload: CreatePaymentRequestDTO = {
                payment: {
                    fullName: form.name,
                    email: form.email,
                    address: form.address,
                    method: form.method.toUpperCase(),
                    amount: totalAmount,
                    shippingFee: 30000,
                },
                items: cart.map(item => ({
                    productVariantId: item.productVariantId,
                    quantity: item.quantity,
                    price: item.price
                }))
            }

            const paymentPayload = {
                ...payload,
                payment: {
                    ...payload.payment,
                    phoneNumber: form.phone
                }
            }

            await paymentService.checkout(paymentPayload)
            setSuccess(true)
        } catch (err) {
            alert("Thanh toán thất bại.")
            console.error(err)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 mt-20">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
                <h1 className="text-2xl font-bold mb-6 text-center">Thanh toán đơn hàng</h1>

                <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-3">Sản phẩm trong giỏ hàng</h2>
                    <div className="divide-y">
                        {cart.map((item) => (
                            <div key={item.productVariantId} className="flex items-center py-3">
                                <img
                                    src={item.imageUrl}
                                    alt={item.productName}
                                    className="w-14 h-14 object-cover rounded border mr-4"
                                />
                                <div className="flex-1">
                                    <div className="font-medium">{item.productName}</div>
                                    <div className="text-sm text-gray-500">
                                        Số lượng: {item.quantity}
                                    </div>
                                </div>
                                <div className="font-semibold text-blue-700">
                                    {(item.price * item.quantity).toLocaleString("vi-VN")}₫
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <span className="font-semibold">Tổng tiền:</span>
                        <span className="text-xl font-bold text-green-600">
                            {totalAmount.toLocaleString("vi-VN")}₫
                        </span>
                    </div>
                </div>

                {success ? (
                    <div className="text-center space-y-4">
                        <div className="text-green-600 text-3xl">✔</div>
                        <div className="text-lg font-semibold">Thanh toán thành công!</div>
                        <div>Cảm ơn bạn đã mua hàng.</div>
                    </div>
                ) : (
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium mb-1">Họ và tên</label>
                            <input
                                type="text"
                                className="w-full border rounded px-3 py-2"
                                value={form.name}
                                onChange={(e) => handleChange("name", e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <input
                                type="email"
                                className="w-full border rounded px-3 py-2"
                                value={form.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Số điện thoại</label>
                            <input
                                type="tel"
                                className="w-full border rounded px-3 py-2"
                                value={form.phone}
                                onChange={(e) => handleChange("phone", e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Địa chỉ nhận hàng</label>
                            <input
                                type="text"
                                className="w-full border rounded px-3 py-2"
                                value={form.address}
                                onChange={(e) => handleChange("address", e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Số tiền (VNĐ)</label>
                            <input
                                type="number"
                                className="w-full border rounded px-3 py-2"
                                value={totalAmount}
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Phương thức thanh toán</label>
                            <select
                                className="w-full border rounded px-3 py-2"
                                value={form.method}
                                onChange={(e) => handleChange("method", e.target.value)}
                            >
                                <option value="cod">Thanh toán khi nhận hàng (COD)</option>
                                <option value="bank">Chuyển khoản ngân hàng</option>
                                <option value="momo">Ví MoMo</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Đang xử lý..." : "Thanh toán"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
}
