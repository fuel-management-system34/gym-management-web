import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from '../models/User';
import { CreateUserRequest } from '../models/CreateUserRequest ';
import { UpdateUserRequest } from '../models/UpdateUserRequest ';
import { ChangePasswordRequest, ResetPasswordRequest } from '../models/ChangePasswordRequest ';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private apiService: ApiService) {}

  getUsers(): Observable<User[]> {
    return this.apiService.get<User[]>('/users').pipe(catchError((error) => throwError(() => error)));
  }

  getUser(id: number): Observable<User> {
    return this.apiService.get<User>(`/users/${id}`).pipe(catchError((error) => throwError(() => error)));
  }

  createUser(userData: CreateUserRequest): Observable<User> {
    return this.apiService.post<User>('/users', userData).pipe(catchError((error) => throwError(() => error)));
  }

  updateUser(userData: any): Observable<any> {
    return this.apiService.put(`/users/${userData.userId}`, userData).pipe(catchError((error) => throwError(() => error)));
  }

  deleteUser(id: number): Observable<any> {
    return this.apiService.delete(`/users/${id}`).pipe(catchError((error) => throwError(() => error)));
  }

  changePassword(request: ChangePasswordRequest): Observable<any> {
    return this.apiService.put(`/users/${request.userId}/change-password`, request).pipe(catchError((error) => throwError(() => error)));
  }

  resetPassword(request: ResetPasswordRequest): Observable<any> {
    return this.apiService.put(`/users/${request.userId}/reset-password`, request).pipe(catchError((error) => throwError(() => error)));
  }

  getUserRoles(userId: number): Observable<string[]> {
    return this.apiService.get<string[]>(`/users/${userId}/roles`).pipe(catchError((error) => throwError(() => error)));
  }

  assignRole(userId: number, roleId: number): Observable<any> {
    return this.apiService.post(`/users/${userId}/roles/${roleId}`).pipe(catchError((error) => throwError(() => error)));
  }

  removeRole(userId: number, roleId: number): Observable<any> {
    return this.apiService.delete(`/users/${userId}/roles/${roleId}`).pipe(catchError((error) => throwError(() => error)));
  }

  updateProfile(userData: UpdateUserRequest): Observable<any> {
    return this.apiService.put('/profile', userData).pipe(catchError((error) => throwError(() => error)));
  }

  changeProfilePassword(request: ChangePasswordRequest): Observable<any> {
    return this.apiService.put('/profile/change-password', request).pipe(catchError((error) => throwError(() => error)));
  }
}
