// types/index.ts

// Database types
export type { Database } from './database.types'

// Shop types
export type {
  Artisan,
  Product,
  Order,
  ProductWithArtisan,
  ArtisanWithProducts,
  CartItem,
  CheckoutFormData,
  PaystackResponse,
} from './shop.types'

// Paystack types (after renaming)
export type {
  PaystackInitializeRequest,
  PaystackInitializeResponse,
  PaystackVerifyResponse,
  PaystackWebhookEvent,
} from './paystack.types'




// Deep Repair Sync: 2026-04-11 17:28:30