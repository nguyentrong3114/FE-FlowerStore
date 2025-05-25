"use client";
import { useState, useEffect } from "react";
import { CartService } from "@/services/cart.service";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
interface CartItem {
    productVariantId: number;
    productName: string;
    price: number;
    quantity: number;
    imageUrl: string;
    size: string;
    totalPrice: number;
}

export default function CartPage() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const { user } = useAuth();
    const router = useRouter();
    useEffect(() => {
        const loadCartItems = async () => {
            try {
                if (user != null) {
                    const response = await CartService.getCartItems();
                    console.log(response.cartItems);
                    setCartItems(response.cartItems);
                } else {
                    const localData = localStorage.getItem("local-cart");
                    if (localData) {
                        setCartItems(JSON.parse(localData));
                    }
                }
            } catch (error) {
                console.error("Error loading cart:", error);
            }
        };
        loadCartItems();
    }, [user]);
    const handleCheckOut = () => {
        router.push("/payment");
    }
    const updateQuantity = async (productVariantId: number, delta: number) => {
        try {
            const item = cartItems.find(item => item.productVariantId === productVariantId);
            if (!item) return;

            const newQuantity = item.quantity + delta;
            
            if (newQuantity <= 0) {
                if (window.confirm('Bạn có muốn xóa sản phẩm này khỏi giỏ hàng không?')) {
                    await removeFromCart(productVariantId, item.quantity);
                    return;
                }
                return;
            }

            const updatedCart = cartItems.map(item =>
                item.productVariantId === productVariantId
                    ? {
                        ...item,
                        quantity: newQuantity,
                        totalPrice: item.price * newQuantity
                    }
                    : item
            );

            if (user != null) {
                try {
                    await CartService.updateCartItem(productVariantId, newQuantity);
                    console.log("Gửi updateCartItem:", productVariantId, newQuantity);
                } catch (error) {
                    console.error("Lỗi khi gọi API, cập nhật local storage");
                    const localData = localStorage.getItem("local-cart");
                    if (localData) {
                        const localCart = JSON.parse(localData);
                        const updatedLocalCart = localCart.map((item: CartItem) =>
                            item.productVariantId === productVariantId
                                ? {
                                    ...item,
                                    quantity: newQuantity,
                                    totalPrice: item.price * newQuantity
                                }
                                : item
                        );
                        localStorage.setItem("local-cart", JSON.stringify(updatedLocalCart));
                    }
                }
            } else {
                const localData = localStorage.getItem("local-cart");
                if (localData) {
                    const localCart = JSON.parse(localData);
                    const updatedLocalCart = localCart.map((item: CartItem) =>
                        item.productVariantId === productVariantId
                            ? {
                                ...item,
                                quantity: newQuantity,
                                totalPrice: item.price * newQuantity
                            }
                            : item
                    );
                    localStorage.setItem("local-cart", JSON.stringify(updatedLocalCart));
                }
            }

            setCartItems(updatedCart);
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };

    const removeFromCart = async (productVariantId: number, quantity: number) => {
        try {
            if (user != null) {
                await CartService.removeFromCart(productVariantId, quantity);
            } else {
                const localData = localStorage.getItem("local-cart");
                if (localData) {
                    const localCart = JSON.parse(localData);
                    const updatedLocalCart = localCart.filter((item: CartItem) => 
                        item.productVariantId !== productVariantId
                    );
                    localStorage.setItem("local-cart", JSON.stringify(updatedLocalCart));
                }
            }
            
            const updatedCart = cartItems.filter(item => item.productVariantId !== productVariantId);
            setCartItems(updatedCart);
        } catch (error) {
            console.error("Error removing item:", error);
        }
    };

    const formatCurrency = (price: number) =>
        price.toLocaleString("us-US", { style: "currency", currency: "USD" });

    return (
        <div className="min-h-screen pt-20 px-6">
            <h1 className="text-3xl font-bold mb-8">🛒 Giỏ hàng của bạn</h1>

            {cartItems.length === 0 ? (
                <p className="text-gray-500">Giỏ hàng đang trống.</p>
            ) : (
                <div className="flex gap-6">
                    <div className="w-2/3 space-y-6">
                        {cartItems.map(item => (
                            <div
                                key={item.productVariantId}
                                className="flex flex-col sm:flex-row justify-between items-center border p-4 rounded-lg shadow-sm"
                            >
                                <div className="flex items-center gap-4 w-full sm:w-auto">
                                    <img
                                        src={item.imageUrl}
                                        alt={item.productName}
                                        className="w-24 h-24 object-cover rounded-md"
                                    />
                                    <div>
                                        <h3 className="text-lg font-semibold">{item.productName}</h3>
                                        <p className="text-gray-600">Đơn giá: {formatCurrency(item.price)}</p>
                                        <p className="text-gray-600">Kích thước: {item.size}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 mt-4 sm:mt-0">
                                    <button
                                        onClick={() => updateQuantity(item.productVariantId, -1)}
                                        className="px-3 py-1 border rounded hover:bg-gray-200"
                                    >
                                        –
                                    </button>
                                    <span className="min-w-[24px] text-center">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.productVariantId, 1)}
                                        className="px-3 py-1 border rounded hover:bg-gray-200"
                                    >
                                        +
                                    </button>

                                    <div className="ml-4">
                                        <p className="font-semibold">Thành tiền: {formatCurrency(item.totalPrice)}</p>
                                    </div>

                                    <button
                                        onClick={() => removeFromCart(item.productVariantId, item.quantity)}
                                        className="text-red-500 hover:text-red-700 ml-4"
                                    >
                                        Xóa
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="w-1/3">
                        <div className="border rounded-lg p-6 shadow-sm sticky top-24">
                            <h2 className="text-xl font-bold mb-4">Tổng đơn hàng</h2>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span>Tạm tính:</span>
                                    <span>{formatCurrency(cartItems.reduce((total, item) => total + item.totalPrice, 0))}</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg border-t pt-3">
                                    <span>Tổng cộng:</span>
                                    <span>{formatCurrency(cartItems.reduce((total, item) => total + item.totalPrice, 0))}</span>
                                </div>
                                <button onClick={handleCheckOut} className="w-full bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 mt-4">
                                    Thanh toán
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
