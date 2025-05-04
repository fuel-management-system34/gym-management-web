import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ApiService } from '../../Core/services/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class MemberApiService {
  private apiUrl = environment.apiUrl;
  constructor(private apiService: ApiService) {}

  getAllMembers(): Observable<any> {
    return this.apiService.get<any>(`members`)
      .pipe(catchError(error => throwError(() => error)));
  }

  addMember(memberData: any): Observable<any> {
    return this.apiService.post<any>('/member/add', memberData).pipe(catchError((error) => throwError(() => error)));
  }
}
