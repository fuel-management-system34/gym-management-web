import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../Core/services/api.service';
import { Trainer } from '../../Models/trainer/trainer.model';

@Injectable({
  providedIn: 'root'
})
export class TrainerApiService {
  constructor(private apiService: ApiService) {}

  addTrainer(staffData: Trainer): Observable<any> {
    return this.apiService.post<any>('/trainer/add', staffData);
  }
}
