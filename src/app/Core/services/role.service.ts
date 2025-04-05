import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { catchError, Observable } from 'rxjs';
import { Role } from '../models/Role';
import { User } from '../models/User';
import { CreateRoleRequest } from '../models/CreateRoleRequest ';
import { UpdateRoleRequest } from '../models/UpdateRoleRequest ';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor(private apiService: ApiService) {}

  getRoles(): Observable<any> {
    return this.apiService.get<Role[]>('/roles').pipe(catchError((error) => throwError(() => error)));
  }

  getRole(id: number): Observable<any> {
    return this.apiService.get<Role>(`/roles/${id}`).pipe(catchError((error) => throwError(() => error)));
  }

  createRole(roleData: CreateRoleRequest): Observable<any> {
    return this.apiService.post<Role>('/roles', roleData).pipe(catchError((error) => throwError(() => error)));
  }

  updateRole(roleData: UpdateRoleRequest): Observable<any> {
    return this.apiService.put(`/roles/${roleData.roleId}`, roleData).pipe(catchError((error) => throwError(() => error)));
  }

  deleteRole(id: number): Observable<any> {
    return this.apiService.delete(`/roles/${id}`).pipe(catchError((error) => throwError(() => error)));
  }

  getUsersInRole(roleId: number): Observable<any> {
    return this.apiService.get<User[]>(`/roles/${roleId}/users`).pipe(catchError((error) => throwError(() => error)));
  }
}

function throwError(arg0: () => any): any {
  throw new Error('Function not implemented.');
}
