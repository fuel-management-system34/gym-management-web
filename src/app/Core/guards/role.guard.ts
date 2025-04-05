import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const requiredRoles = route.data['roles'] as Array<string>;

    return this.authService.currentUser.pipe(
      take(1),
      map((user) => {
        // Check if user is authenticated and has required roles
        if (user && requiredRoles) {
          const hasRequiredRole = requiredRoles.some((role) => user.roles.includes(role));
          if (hasRequiredRole) {
            return true;
          }
        }

        // Redirect to unauthorized page
        return this.router.createUrlTree(['/unauthorized']);
      })
    );
  }
}
