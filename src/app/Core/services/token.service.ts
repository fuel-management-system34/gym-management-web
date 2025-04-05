import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private tokenKey = 'auth_token';
  private refreshTokenKey = 'refresh_token';

  constructor() {
    console.log('Token service initialized');
  }

  getToken(): string | null {
    const token = localStorage.getItem(this.tokenKey);
    console.log('Getting token from storage:', token ? 'Token exists' : 'No token');
    return token;
  }

  saveToken(token: string): void {
    console.log('Saving token to storage');
    localStorage.setItem(this.tokenKey, token);
  }

  removeToken(): void {
    console.log('Removing token from storage');
    localStorage.removeItem(this.tokenKey);
  }

  getRefreshToken(): string | null {
    const refreshToken = localStorage.getItem(this.refreshTokenKey);
    console.log('Getting refresh token from storage:', refreshToken ? 'Refresh token exists' : 'No refresh token');
    return refreshToken;
  }

  saveRefreshToken(refreshToken: string): void {
    console.log('Saving refresh token to storage');
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  removeRefreshToken(): void {
    console.log('Removing refresh token from storage');
    localStorage.removeItem(this.refreshTokenKey);
  }
}
