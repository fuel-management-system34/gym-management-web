import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { TokenResponse } from '../models/TokenResponse ';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenRefreshService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  refreshToken(refreshToken: string): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.apiUrl}refresh`, { refreshToken });
  }

  validateToken(token: string): Observable<boolean> {
    return this.http
      .get(`${this.apiUrl}/Auth/validate-token`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }
}
