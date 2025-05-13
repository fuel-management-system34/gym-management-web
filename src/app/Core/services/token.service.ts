import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private tokenKey = 'auth_token';
  private refreshTokenKey = 'refresh_token';

  getUserData(): string {
    const userDetails = localStorage.getItem('_userDetails');
    return userDetails;
  }
  getToken(): string | null {
    const token = localStorage.getItem(this.tokenKey);
    return token;
  }

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  getRefreshToken(): string | null {
    const refreshToken = localStorage.getItem(this.refreshTokenKey);
    return refreshToken;
  }

  saveRefreshToken(refreshToken: string): void {
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  removeRefreshToken(): void {
    localStorage.removeItem(this.refreshTokenKey);
  }

  isTokenExpired(token: string): boolean {
    try {
      const [, payload] = token.split('.');
      const decodedPayload = JSON.parse(atob(payload));
      const exp = decodedPayload.exp;
      const now = Math.floor(Date.now() / 1000);
      return exp < now;
    } catch (e) {
      console.error('Token parsing error:', e);
      return true;
    }
  }

  saveTokens(response: { access_token: string; refresh_token: string }): void 
  {
    this.saveToken(response.access_token);
    this.saveRefreshToken(response.refresh_token);
  }


}
