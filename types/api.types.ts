export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiErrorResponse {
  error: string;
  message?: string;
  status?: number;
}

export interface PaystackInitResponse {
  authorization_url: string;
  reference: string;
  access_code: string;
}

export type ApiError = Error & {
  status?: number;
};
