import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { catchError, Observable, switchMap, throwError } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    const expiryTime = localStorage.getItem('tokenExpiry');
    const now = Date.now();

    if (token && expiryTime) {
      // Check if the token is about to expire (for example, within 5 minutes)
      if (now > +expiryTime - 5 * 60 * 1000) {
        // Call the refresh token endpoint to get a new token
        return this.authService.refreshToken().pipe(
          switchMap((newToken: any) => {
            // Store new token and expiration time
            localStorage.setItem('token', newToken.token);
            localStorage.setItem('tokenExpiry', newToken.expiry.toString());

            // Clone the request with new token
            const clonedReq = req.clone({
              headers: req.headers.set('Authorization', `Bearer ${newToken.token}`)
            });
            return next.handle(clonedReq);
          }),
          catchError((error) => {
            // Handle error or log the user out if refresh fails
            this.authService.logout();
            this.router.navigate(['/login']);
            return throwError(error);
          })
        );
      } else {
        // Clone request and add token to header if valid
        const clonedReq = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
        return next.handle(clonedReq);
      }
    } else {
      // If no token is available, proceed with the request normally
      return next.handle(req);
    }
  }
}
