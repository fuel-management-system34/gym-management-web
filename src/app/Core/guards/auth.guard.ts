import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(
    private router: Router,
    private tokenService: TokenService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    const token = this.tokenService.getToken();

    if (token && !this.isTokenExpired(token)) {
      return of(true);
    } else {
      console.warn('AuthGuard: No token or expired. Redirecting to /login...');
      return of(this.router.createUrlTree(['/login']));
    }
  }

  private isTokenExpired(token: string): boolean {
    try {
      const [, payload] = token.split('.');
      const decodedPayload = JSON.parse(atob(payload));
      const exp = decodedPayload.exp;
      const now = Math.floor(Date.now() / 1000);
      return exp < now;
    } catch (e) {
      console.error('Token parsing failed', e);
      return true;
    }
  }
}