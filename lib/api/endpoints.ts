export const API_ENDPOINTS = {
  health: "/api/health",
  checkout: "/api/checkout",
  webhook: {
    paystack: "/api/webhook/paystack",
  },
  shop: {
    products: "/shop",
    product: (id: string) => `/shop/${id}`,
  },
};
