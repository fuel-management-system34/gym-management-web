import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthRequestModel } from '../Models/Auth/auth-request-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: boolean = false;
  constructor(private http: HttpClient) {}

  private apiUrl = environment.apiUrl;

  setAuthenticationStatus(status: boolean) {
    this.isAuthenticated = status;
  }

  getAuthenticationStatus(): boolean {
    return this.isAuthenticated;
  }

  checkAuthenticationOnInit() {
    const token = localStorage.getItem('token');
    const expiryTime = localStorage.getItem('tokenExpiry');
    const now = Date.now();

    if (token && expiryTime && now < +expiryTime) {
      this.isAuthenticated = true;
    } else {
      this.logout();
    }
  }

  login(request: AuthRequestModel): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, request);
  }

  loginWithGoogle(token: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/google`, { idToken: token });
  }

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');
    return this.http.post('/auth/refresh', { token: refreshToken });
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
  }
}
