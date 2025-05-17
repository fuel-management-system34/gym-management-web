import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../Core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class HolidayApiService {
  constructor(private apiService: ApiService) {}

  getHolidayList(): Observable<any> {
    return this.apiService.get<any>(`holiday/listAdvanced`);
  }

  addHoliday(data: any): Observable<any> {
    return this.apiService.post<any>('holiday/add', data);
  }

  editHoliday(data: any): Observable<any> {
    return this.apiService.post<any>('holiday/edit', data);
  }

  fetchById(id: number): Observable<any> {
    return this.apiService.get<any>(`holiday/${id}`);
  }
}
