import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../Core/services/api.service';
@Injectable({
  providedIn: 'root'
})
export class MemberApiService {
  constructor(private apiService: ApiService) {}

  getAllMembers(): Observable<any> {
    return this.apiService.get<any>(`members`);
  }

  addMember(memberData: any): Observable<any> {
    return this.apiService.post<any>('/member/add', memberData);
  }
}
