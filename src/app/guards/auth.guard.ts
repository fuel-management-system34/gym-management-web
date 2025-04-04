import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(): boolean {
    const isAuthenticated = this.authService.getAuthenticationStatus();
    const token = localStorage.getItem('token');
    const expiryTime = localStorage.getItem('tokenExpiry');
    const now = Date.now();

    if (!isAuthenticated) {
      this.router.navigate(['/login']);
      return false;
    } else if (token && expiryTime && now < +expiryTime) {
      return true;
    }
    return true;
  }
}
