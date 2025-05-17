import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../Core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class PackageApiService {
  constructor(private apiService: ApiService) {}

  getPackages(): Observable<any> {
    return this.apiService.get<any>(`package/listAdvanced`);
  }

  addPackage(data: any): Observable<any> {
    return this.apiService.post<any>('package/add', data);
  }

  editPackage(data: any): Observable<any> {
    return this.apiService.post<any>('package/edit', data);
  }

  fetchById(id: number): Observable<any> {
    return this.apiService.get<any>(`package/${id}`);
  }
}
