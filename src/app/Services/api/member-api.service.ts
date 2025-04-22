import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberApiService {
  private apiUrl = 'https://api.example.com/members'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  addMember(memberData: any): Observable<any> {
    return this.http.post(this.apiUrl, memberData);
  }
}
