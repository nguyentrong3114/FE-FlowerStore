import api from "@/lib/api";

export const CartService = {
    getCartItems: async () => {
        const response = await api.get('/cart');
        return response.data;
    },
    addToCart: async (productId: string) => {
        const response = await api.post('/cart', {
            productId,
        });
        return response.data;
    },
    removeFromCart: async (productId: string) => {
        const response = await api.delete(`/cart/${productId}`);
        return response.data;
    },
    updateCartItem: async (productId: string, quantity: number) => {
        const response = await api.put(`/cart/${productId}`, {
            quantity,
        });
        return response.data;
    }
}
