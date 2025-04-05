export interface TokenResponse {
  success: boolean;
  token: string;
  refreshToken: string;
  username: string;
  email: string;
  roles: string[];
  expiration: Date;
}
