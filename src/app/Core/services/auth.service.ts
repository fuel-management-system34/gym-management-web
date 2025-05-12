import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, finalize, of, tap, throwError } from 'rxjs';
import { User } from '../models/User';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { TokenResponse } from '../models/TokenResponse';
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
    this.init();
  }

private init(): void {
  const token = this.tokenService.getToken();

  if (token && !this.tokenService.isTokenExpired(token)) {
    this.loadUserProfile();
  } else {
    this.attemptRefresh();
  }
}


  // JWT login
  login(credentials: { email: string; password: string }): Observable<TokenResponse> {
    return this.apiService.post<TokenResponse>('login', credentials).pipe(
      tap((response) => {
        this.setAuth(response);
        this.isAuthenticatedSubject.next(true);

        // Start token expiration timer
        this.startTokenExpirationTimer();
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  logout(): Observable<any> {
    return this.apiService.post('logout').pipe(
      finalize(() => {
        this.purgeAuth();
        this.router.navigate(['/login']);
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  refreshToken(refreshTokenParam?: string): Observable<TokenResponse> {
    const refreshToken = refreshTokenParam || this.tokenService.getRefreshToken();
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    return this.tokenRefreshService.refreshToken(refreshToken).pipe(
      tap((response) => {
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
        this.purgeAuth(); // Clear auth on refresh failure
        return throwError(() => error);
      })
    );
  }

  validateToken(): Observable<boolean> {
    const token = this.tokenService.getToken();
    if (!token) {
      return of(false);
    }

    return this.tokenRefreshService.validateToken(token).pipe(tap((isValid) => {}));
  }

  loadUserProfile(): void {
    this.apiService.get<User>('me').subscribe({
      next: (user) => {
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
        localStorage.setItem('_userDetails', JSON.stringify(user));
      },
      error: (error) => {
        // Only purge auth if it's a 401 error
        if (error.status === 401) {
          this.purgeAuth();
        }
      }
    });
  }

  private setAuth(authResponse: TokenResponse): void {
    // Save JWT token and refresh token
    this.tokenService.saveToken(authResponse.token);
    this.tokenService.saveRefreshToken(authResponse.refreshToken);

    // Set current user and mark as authenticated
    this.loadUserProfile();
  }

  private purgeAuth(): void {
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

      // If token is already expired, try to refresh
      if (timeUntilExpiration <= 0) {
        this.attemptRefresh();
        return;
      }

      // Schedule refresh 1 minute before expiration
      const refreshBuffer = 60 * 1000; // 1 minute in milliseconds
      const timeToRefresh = timeUntilExpiration - refreshBuffer;

      if (timeToRefresh > 0) {
        setTimeout(() => {
          this.attemptRefresh();
        }, timeToRefresh);
      } else {
        // If less than buffer time remains, refresh now
        this.attemptRefresh();
      }
    } catch (e) {}
  }

private attemptRefresh(): void {
  const refreshToken = this.tokenService.getRefreshToken();

  if (!refreshToken) {
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
    return;
  }

  this.tokenRefreshService.refreshToken(refreshToken).subscribe({
    next: (response) => {
     this.tokenService.saveToken(response.token);
      this.tokenService.saveRefreshToken(response.refreshToken);
      this.loadUserProfile();
    },
    error: () => {
      this.isAuthenticatedSubject.next(false);
      this.router.navigate(['/login']); 
    }
  });
}

}
