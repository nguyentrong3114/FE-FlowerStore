import api from "@/lib/api";

export const CartService = {
    getCartItems: async () => {
        const response = await api.get('/cart');
        return response.data;
    },
    addToCart: async ( productVariantId: number, quantity: number) => {
        const response = await api.post('/cart', {
            productVariantId,
            quantity
        });
        return response.data;
    },
    removeFromCart: async (productVariantId: number, quantity: number) => {
        const response = await api.delete(`/cart`, {
            data: {
                productVariantId,
                quantity
            }
        });
        return response.data;
    },
    updateCartItem: async (productVariantId: number, quantity: number) => {
        const response = await api.put(`/cart`, {
            productVariantId,
            quantity,
        });
        return response.data;
    }
}
