import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { User } from '../models/User';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { GoogleLoginRequest } from '../models/GoogleLoginRequest ';
import { TokenResponse } from '../models/TokenResponse ';
import { RegisterRequest } from '../models/RegisterRequest ';
import { RefreshTokenRequest } from '../models/RefreshTokenRequest ';
import { TokenService } from './token.service';

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
    private router: Router
  ) {
    this.init();
  }

  private init(): void {
    if (this.tokenService.getToken()) {
      this.validateToken().subscribe(
        (isValid) => {
          if (isValid) {
            this.loadUserProfile();
          } else {
            this.purgeAuth();
          }
        },
        () => {
          this.purgeAuth();
        }
      );
    }
  }

  googleLogin(credentials: GoogleLoginRequest): Observable<TokenResponse> {
    return this.apiService.post<TokenResponse>('/Auth/google-login', credentials).pipe(
      tap((response) => {
        this.setAuth(response);
        this.isAuthenticatedSubject.next(true);
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  logout(): Observable<any> {
    return this.apiService.post('/Auth/logout').pipe(
      tap(() => {
        this.purgeAuth();
        this.router.navigate(['/login']);
      }),
      catchError((error) => {
        // Even if the logout API fails, we should clear local state
        this.purgeAuth();
        this.router.navigate(['/login']);
        return throwError(() => error);
      })
    );
  }

  refreshToken(): Observable<TokenResponse> {
    const refreshToken = this.tokenService.getRefreshToken();
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    const request: RefreshTokenRequest = { refreshToken };
    return this.apiService.post<TokenResponse>('/Auth/refresh-token', request).pipe(
      tap((response) => this.setAuth(response)),
      catchError((error) => {
        this.purgeAuth();
        return throwError(() => error);
      })
    );
  }

  validateToken(): Observable<boolean> {
    return this.apiService.get('/Auth/validate-token').pipe(
      map(() => true),
      catchError(() => {
        return throwError(() => new Error('Token validation failed'));
      })
    );
  }

  loadUserProfile(): void {
    this.apiService.get<User>('/Profile').subscribe(
      (user) => {
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
      },
      () => {
        this.purgeAuth();
      }
    );
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
}
