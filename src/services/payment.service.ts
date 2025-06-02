import api from "@/lib/api"
export interface PaymentDetailDTO {
    productVariantId: number
    quantity: number
    price: number
  }
  
export interface PaymentDTO {
    method: string
    fullName: string
    phoneNumber: string
    email: string
    address: string
    amount: number
    shippingFee: number
}
export interface CreatePaymentRequestDTO {
    payment: PaymentDTO
    items: PaymentDetailDTO[]
  }

export const paymentService = {
    checkout: async (data: CreatePaymentRequestDTO) => {
        const response = await api.post("/payments", data)
        return response.data
    },
    checkoutUnknown: async (data: CreatePaymentRequestDTO) => {
        const response = await api.post("/payments/unknown", data)
        return response.data
    },
    getOrderByUserId: async () => {
        const response = await api.get(`/payments/user/me`)
        return response.data
    },
    getOrderById: async (orderCode: string) => {
        const response = await api.post("/payments/order",{orderCode})
        return response.data
    }
}
  


