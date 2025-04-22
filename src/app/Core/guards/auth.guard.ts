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

  // auth.guard.ts
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    console.log('AuthGuard checking authentication...');

    if (this.tokenService.getToken() != null) {
      return of(true);
    } else {
      return of(this.router.createUrlTree(['/login']));
    }
  }
}
