// types/paystack.types.ts (renamed from payfast.types.ts)

export interface PaystackInitializeRequest {
  email: string
  amount: number // in kobo (multiply by 100)
  callback_url?: string
  metadata?: Record<string, any>
}

export interface PaystackInitializeResponse {
  status: boolean
  message: string
  data: {
    authorization_url: string
    access_code: string
    reference: string
  }
}

export interface PaystackVerifyResponse {
  status: boolean
  message: string
  data: {
    status: 'success' | 'failed' | 'pending'
    reference: string
    amount: number
    customer: {
      email: string
    }
    metadata: Record<string, any>
    paid_at: string | null
    channel: string
  }
}

export interface PaystackWebhookEvent {
  event: 'charge.success' | 'charge.failed' | 'transfer.success' | string
  data: {
    status: string
    reference: string
    amount: number
    customer: {
      email: string
    }
    metadata: Record<string, any>
  }
}



// Deep Repair Sync: 2026-04-11 17:28:30