import api from "@/lib/api"

export interface PaymentDTO {
    method: string
    fullName: string
    phoneNumber: string
    email: string
    address: string
    amount: number
    shippingFee: number
}

export const paymentService = {
    checkout: async (paymentData: PaymentDTO) => {
        const response = await api.post("/payments", paymentData)
        return response.data
    }
}
  


