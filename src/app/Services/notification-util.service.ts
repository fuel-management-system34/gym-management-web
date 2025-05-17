// src/app/core/services/notification.service.ts
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { CustomNotificationComponent } from '../theme/shared/components/custom-notification/custom-notification.component';

export type NotificationType = 'success' | 'info' | 'warning' | 'error';

export interface NotificationData {
  type: NotificationType;
  title: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  private show(data: NotificationData, duration: number = 5000): void {
    const config: MatSnackBarConfig = {
      duration: duration,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      data: data,
      panelClass: ['custom-snackbar', 'mat-elevation-z4']
    };

    this.snackBar.openFromComponent(CustomNotificationComponent, config);
  }

  success(message: string, title: string = 'Success'): void {
    this.show({ type: 'success', title, message });
  }

  info(message: string, title: string = 'Info'): void {
    this.show({ type: 'info', title, message });
  }

  warning(message: string, title: string = 'Warning'): void {
    this.show({ type: 'warning', title, message });
  }

  error(message: string, title: string = 'Error'): void {
    this.show({ type: 'error', title, message });
  }
}
