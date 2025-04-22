import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ApiService } from '../../Core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class MemberApiService {
  constructor(private apiService: ApiService) {}

  addMember(memberData: any): Observable<any> {
    return this.apiService.post<any>('/member/add', memberData).pipe(catchError((error) => throwError(() => error)));
  }
}
