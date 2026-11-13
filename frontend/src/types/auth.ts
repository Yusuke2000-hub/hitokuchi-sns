export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  userId: number;
  username: string;
}

export interface RefreshResponse {
  accessToken: string;
  tokenType: string;
}

export interface FieldError {
  field: string;
  message: string;
}

export interface ApiErrorResponse {
  status: number;
  message: string;
  errors?: FieldError[];
}
