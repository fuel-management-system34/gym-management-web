import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { finalize } from 'rxjs';
import { User } from '../../../../Core/models/User';
import { UserService } from '../../../../Core/services/user.service';
import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../../../../theme/shared/shared.module';
import { NotificationService } from 'src/app/Services/notification-util.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSort,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    ReactiveFormsModule,
    SharedModule,
    MatDialogModule
  ]
})
export class UserListComponent implements OnInit, AfterViewInit {
  displayedColumns = ['username', 'email', 'firstName', 'lastName', 'isActive', 'actions'];
  dataSource = new MatTableDataSource<User>([]);
  loading = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadUsers(): void {
    this.loading = true;
    this.userService
      .getUsers()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (users) => (this.dataSource.data = users),
        error: () => this.notificationService.error('Failed to load users')
      });
  }

  openUserForm(user?: User): void {
    const dialogRef = this.dialog.open(AddEditUserComponent, {
      width: '800px',
      data: { user }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadUsers();
    });
  }

  deleteUser(user: User): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirm Delete',
        message: `Are you sure you want to delete user "${user.username}"?`,
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.deleteUser(user.userId).subscribe({
          next: () => {
            this.notificationService.success(`User deleted successfully`);
            this.loadUsers();
          },
          error: () => this.notificationService.error(`Failed to delete user`)
        });
      }
    });
  }

  toggleUserStatus(user: User): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: user.isActive ? 'Deactivate User' : 'Activate User',
        message: `Are you sure you want to ${user.isActive ? 'deactivate' : 'activate'} user "${user.username}"?`,
        confirmText: user.isActive ? 'Deactivate' : 'Activate',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const updatedUser = { ...user, isActive: !user.isActive };
        this.userService.updateUser(updatedUser).subscribe({
          next: () => {
            this.notificationService.success(`User ${updatedUser.isActive ? 'activated' : 'deactivated'} successfully`);
            this.loadUsers();
          },
          error: () => this.notificationService.error(`Failed to ${updatedUser.isActive ? 'activate' : 'deactivate'} user`)
        });
      }
    });
  }

  resetPassword(user: User): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Reset Password',
        message: `Are you sure you want to reset password for user "${user.username}"?`,
        confirmText: 'Reset',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Implement reset password logic here
        this.notificationService.error(`Password reset functionality would be implemented here`);
      }
    });
  }
}
