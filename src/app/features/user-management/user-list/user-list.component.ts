import { UpdateUserRequest } from './../../../Core/models/UpdateUserRequest ';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCommonModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { finalize } from 'rxjs';
import { User } from '../../..//Core/models/User';
import { UserService } from '../../../Core/services/user.service';
import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatChipListbox, MatChipSet, MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    AddEditUserComponent,
    ConfirmDialogComponent,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatPaginatorModule,
    MatMenuModule
  ]
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['username', 'email', 'firstName', 'lastName', 'roles', 'isActive', 'actions'];
  dataSource = new MatTableDataSource<User>([]);
  loading = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadUsers() {
    this.loading = true;
    this.userService
      .getUsers()
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(
        (users) => {
          this.dataSource.data = users;
        },
        (error) => {
          this.toastr.error('Failed to load users', 'Error');
        }
      );
  }

  openUserForm(user?: User) {
    const dialogRef = this.dialog.open(AddEditUserComponent, {
      width: '600px',
      data: { user }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadUsers();
      }
    });
  }

  deleteUser(user: User) {
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
        this.userService.deleteUser(user.userId).subscribe(
          () => {
            this.toastr.success('User deleted successfully', 'Success');
            this.loadUsers();
          },
          (error) => {
            this.toastr.error('Failed to delete user', 'Error');
          }
        );
      }
    });
  }

  toggleUserStatus(user: User) {
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
        const updatedUser = {
          ...user,
          isActive: !user.isActive
        };

        this.userService.updateUser(updatedUser).subscribe(
          () => {
            this.toastr.success(`User ${updatedUser.isActive ? 'activated' : 'deactivated'} successfully`, 'Success');
            this.loadUsers();
          },
          (error) => {
            this.toastr.error(`Failed to ${updatedUser.isActive ? 'activate' : 'deactivate'} user`, 'Error');
            console.error('Error updating user status:', error);
          }
        );
      }
    });
  }

  resetPassword(user: User) {
    // In a real application, you might want to provide a form to enter a new password
    // or generate a random password and send it to the user's email
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
        // Here, you would implement the password reset functionality
        this.toastr.info('Password reset functionality would be implemented here', 'Information');
      }
    });
  }
}
