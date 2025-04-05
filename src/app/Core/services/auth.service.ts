import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, finalize, map, of, switchMap, take, tap, throwError } from 'rxjs';
import { User } from '../models/User';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { GoogleLoginRequest } from '../models/GoogleLoginRequest ';
import { TokenResponse } from '../models/TokenResponse ';
import { RegisterRequest } from '../models/RegisterRequest ';
import { RefreshTokenRequest } from '../models/RefreshTokenRequest ';
import { TokenService } from './token.service';
import { TokenRefreshService } from './token-refresh.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private tokenService: TokenService,
    private tokenRefreshService: TokenRefreshService,
    private router: Router
  ) {
    console.log('Auth service initializing');
    console.log('Token in storage:', this.tokenService.getToken());
    console.log('Refresh token in storage:', this.tokenService.getRefreshToken());
    this.init();
  }

  private init(): void {
    if (this.tokenService.getToken()) {
      console.log('Token found, validating...');
      this.validateToken().subscribe({
        next: (isValid) => {
          if (isValid) {
            console.log('Token is valid, loading user profile');
            this.loadUserProfile();
          } else {
            console.log('Token is invalid, attempting to refresh');
            this.attemptRefresh();
          }
        },
        error: (error) => {
          console.error('Error validating token:', error);
          this.attemptRefresh();
        }
      });
    } else {
      console.log('No token found, not authenticated');
      this.isAuthenticatedSubject.next(false);
    }
  }

  googleLogin(credentials: GoogleLoginRequest): Observable<TokenResponse> {
    return this.apiService.post<TokenResponse>('/Auth/google-login', credentials).pipe(
      tap((response) => {
        console.log('Login successful, storing auth data');
        this.setAuth(response);
        this.isAuthenticatedSubject.next(true);

        // Start token expiration timer
        this.startTokenExpirationTimer();
      }),
      catchError((error) => {
        console.error('Login failed:', error);
        return throwError(() => error);
      })
    );
  }

  logout(): Observable<any> {
    return this.apiService.post('/Auth/logout').pipe(
      finalize(() => {
        console.log('Logging out, clearing auth data');
        this.purgeAuth();
        this.router.navigate(['/login']);
      }),
      catchError((error) => {
        console.error('Logout API error:', error);
        return throwError(() => error);
      })
    );
  }

  refreshToken(refreshTokenParam?: string): Observable<TokenResponse> {
    const refreshToken = refreshTokenParam || this.tokenService.getRefreshToken();
    if (!refreshToken) {
      console.error('No refresh token available');
      return throwError(() => new Error('No refresh token available'));
    }

    console.log('Attempting to refresh token');
    return this.tokenRefreshService.refreshToken(refreshToken).pipe(
      tap((response) => {
        console.log('Token refresh successful');
        // Save the new tokens
        this.tokenService.saveToken(response.token);
        if (response.refreshToken) {
          this.tokenService.saveRefreshToken(response.refreshToken);
        }
        this.isAuthenticatedSubject.next(true);

        // Also reload user profile with new token
        this.loadUserProfile();

        // Restart expiration timer
        this.startTokenExpirationTimer();
      }),
      catchError((error) => {
        console.error('Token refresh failed:', error);
        this.purgeAuth(); // Clear auth on refresh failure
        return throwError(() => error);
      })
    );
  }

  validateToken(): Observable<boolean> {
    console.log('Validating token with backend');
    const token = this.tokenService.getToken();
    if (!token) {
      return of(false);
    }

    return this.tokenRefreshService.validateToken(token).pipe(
      tap((isValid) => {
        console.log('Token validation result:', isValid ? 'valid' : 'invalid');
      })
    );
  }

  loadUserProfile(): void {
    console.log('Loading user profile');
    this.apiService.get<User>('/Profile').subscribe({
      next: (user) => {
        console.log('User profile loaded:', user);
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
      },
      error: (error) => {
        console.error('Error loading profile:', error);
        // Only purge auth if it's a 401 error
        if (error.status === 401) {
          this.purgeAuth();
        }
      }
    });
  }

  private setAuth(authResponse: TokenResponse): void {
    console.log('Setting auth data with tokens');
    // Save JWT token and refresh token
    this.tokenService.saveToken(authResponse.token);
    this.tokenService.saveRefreshToken(authResponse.refreshToken);

    // Set current user and mark as authenticated
    this.loadUserProfile();
  }

  private purgeAuth(): void {
    console.log('Purging auth data');
    // Remove JWT token and refresh token
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();

    // Set current user to null and mark as not authenticated
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  startTokenExpirationTimer(): void {
    // Decode JWT to get expiration time
    const token = this.tokenService.getToken();
    if (!token) {
      console.log('No token to start expiration timer');
      return;
    }

    try {
      // Parse the token
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const tokenPayload = JSON.parse(atob(base64));

      const expiresAt = tokenPayload.exp * 1000; // Convert to milliseconds (fix: was *100)
      const now = Date.now();

      // Time until token expires in milliseconds
      const timeUntilExpiration = expiresAt - now;

      console.log(`Token expires in ${Math.floor(timeUntilExpiration / 1000 / 60)} minutes`);

      // If token is already expired, try to refresh
      if (timeUntilExpiration <= 0) {
        console.log('Token already expired, refreshing now');
        this.attemptRefresh();
        return;
      }

      // Schedule refresh 1 minute before expiration
      const refreshBuffer = 60 * 1000; // 1 minute in milliseconds
      const timeToRefresh = timeUntilExpiration - refreshBuffer;

      if (timeToRefresh > 0) {
        console.log(`Scheduling token refresh in ${Math.floor(timeToRefresh / 1000 / 60)} minutes`);
        setTimeout(() => {
          console.log('Time to refresh token');
          this.attemptRefresh();
        }, timeToRefresh);
      } else {
        // If less than buffer time remains, refresh now
        console.log('Token close to expiration, refreshing now');
        this.attemptRefresh();
      }
    } catch (e) {
      console.error('Error setting up token expiration timer:', e);
    }
  }

  private attemptRefresh(): void {
    const refreshToken = this.tokenService.getRefreshToken();
    if (!refreshToken) {
      console.log('No refresh token available');
      return;
    }

    console.log('Attempting to refresh token');
    this.refreshToken(refreshToken).subscribe({
      next: () => {
        console.log('Token refreshed successfully');
      },
      error: (error) => {
        console.error('Token refresh failed:', error);
        // User will be logged out on next API call that returns 401
      }
    });
  }
}
