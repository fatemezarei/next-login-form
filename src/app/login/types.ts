export interface LoginPayload {
  social_security_number: number;
  password: string;
}

export interface LoginResponse {
  status: number;
  message: string;
  result: {
    accessToken: string;
  };
}
