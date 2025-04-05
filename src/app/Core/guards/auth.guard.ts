import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // auth.guard.ts
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    console.log('AuthGuard checking authentication...');

    return this.authService.isAuthenticated.pipe(
      take(1),
      map((isAuthenticated) => {
        console.log('AuthGuard: isAuthenticated =', isAuthenticated);

        if (isAuthenticated) {
          return true;
        }

        console.log('AuthGuard: not authenticated, redirecting to login');
        return this.router.createUrlTree(['/login']);
      })
    );
  }
}
