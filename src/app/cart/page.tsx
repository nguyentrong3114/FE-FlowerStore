"use client";
import { useState, useEffect } from "react";
import { AuthService } from "@/services/auth.service";
import { CartService } from "@/services/cart.service";

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
}

export default function CartPage() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        const loadCartItems = async () => {
            try {
                const isLogin = await AuthService.isLogin();
                if (isLogin) {
                    const response = await CartService.getCartItems();
                    setCartItems(response.cartItems);
                    console.log(response.cartItems);
                    localStorage.setItem('cartItems', JSON.stringify(response.cartItems));
                } else {
                    const localData = localStorage.getItem("cartItems");
                    if (localData) {
                        setCartItems(JSON.parse(localData));
                    }
                }
            } catch (error) {
                console.error("Error loading cart:", error);
            }
        };
        loadCartItems();
    }, []);

    const updateQuantity = (productId: number, delta: number) => {
        const updatedCart = cartItems.map(item =>
            item.id === productId
                ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                : item
        );
        setCartItems(updatedCart);
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    };

    const removeFromCart = (productId: number) => {
        const updatedCart = cartItems.filter(item => item.id !== productId);
        setCartItems(updatedCart);
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    };

    const formatCurrency = (price: number) =>
        price.toLocaleString("en-US", { style: "currency", currency: "USD" });

    return (
        <div className="min-h-screen pt-20 px-6">
            <h1 className="text-3xl font-bold mb-8">🛒 Giỏ hàng của bạn</h1>

            {cartItems.length === 0 ? (
                <p className="text-gray-500">Giỏ hàng đang trống.</p>
            ) : (
                <div className="space-y-6">
                    {cartItems.map(item => (
                        <div
                            key={item.id}
                            className="flex flex-col sm:flex-row justify-between items-center border p-4 rounded-lg shadow-sm"
                        >
                            <div className="flex items-center gap-4 w-full sm:w-auto">
                                <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    className="w-24 h-24 object-cover rounded-md"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold">{item.name}</h3>
                                    <p className="text-gray-600">{formatCurrency(item.price)}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 mt-4 sm:mt-0">
                                <button
                                    onClick={() => updateQuantity(item.id, -1)}
                                    className="px-3 py-1 border rounded hover:bg-gray-200"
                                >
                                    –
                                </button>
                                <span className="min-w-[24px] text-center">{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item.id, 1)}
                                    className="px-3 py-1 border rounded hover:bg-gray-200"
                                >
                                    +
                                </button>

                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-red-500 hover:text-red-700 ml-4"
                                >
                                    Xóa
                                </button>
                            </div>
                        </div>
                    ))}

                    <div className="mt-10 flex justify-between items-center border-t pt-6">
                        <div className="text-2xl font-bold">
                            Tổng cộng:{" "}
                            {formatCurrency(
                                cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
                            )}
                        </div>
                        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                            Thanh toán
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
