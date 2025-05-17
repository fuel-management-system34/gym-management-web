import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EquipmentType } from 'src/app/Core/models/EquipmentTypes';
import { ApiService } from 'src/app/Core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class EquipmentTypeService {
  constructor(private apiService: ApiService) {}

  getAllEquipmentTypes(): Observable<any> {
    return this.apiService.get<any>(`equipment-types`);
  }

  fetchById(id: number) {
    return this.apiService.get<{ data: EquipmentType }>(`equipment-types/${id}`);
  }

  addEquipmentType(payload: Partial<EquipmentType>) {
    return this.apiService.post(`equipment-types`, payload);
  }

  updateEquipmentType(id: number, payload: Partial<EquipmentType>) {
    return this.apiService.put(`equipment-types/${id}`, payload);
  }
}
