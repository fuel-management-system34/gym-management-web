import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationUtilService {
  constructor(private snackBar: MatSnackBar) {}

  private showSnackbar(content: string, action: string, duration: number, panelClass: string) {
    let sb = this.snackBar.open(content, action, {
      duration: duration,
      panelClass: panelClass,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
    sb.onAction().subscribe(() => {
      sb.dismiss();
    });
  }

  // Show success snackbar
  showSuccess(content: string, action: string = 'Close', duration: number = 6000) {
    this.showSnackbar(content, action, duration, 'snackbar-success');
  }

  // Show error snackbar
  showError(content: string, action: string = 'Close', duration: number = 6000) {
    this.showSnackbar(content, action, duration, 'snackbar-error');
  }

  // Show warning snackbar
  showWarning(content: string, action: string = 'Close', duration: number = 6000) {
    this.showSnackbar(content, action, duration, 'snackbar-warning');
  }
}
