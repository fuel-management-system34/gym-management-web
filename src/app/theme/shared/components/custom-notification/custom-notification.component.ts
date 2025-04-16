// src/app/shared/components/custom-notification/custom-notification.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { NotificationData } from '../../../../Services/notification-util.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-notification',
  templateUrl: './custom-notification.component.html',
  styleUrls: ['./custom-notification.component.scss'],
  standalone: true,
  imports: [MatIconModule, CommonModule]
})
export class CustomNotificationComponent {
  constructor(
    public snackBarRef: MatSnackBarRef<CustomNotificationComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: NotificationData
  ) {}

  getIcon(): string {
    switch (this.data.type) {
      case 'success':
        return 'check_circle';
      case 'info':
        return 'info';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
      default:
        return 'info';
    }
  }

  getContainerClass(): string {
    return `notification-${this.data.type}-container`;
  }

  close(): void {
    this.snackBarRef.dismiss();
  }
}
