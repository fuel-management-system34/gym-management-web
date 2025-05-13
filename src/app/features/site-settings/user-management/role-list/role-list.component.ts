import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { finalize } from 'rxjs';
import { Role } from '../../../../Core/models/Role';
import { RoleService } from '../../../../Core/services/role.service';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { AddEditRoleComponent } from '../add-edit-role/add-edit-role.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCommonModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { NotificationService } from '../../../../Services/notification-util.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinner, MatSpinner } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatProgressSpinner,
    MatMenuModule
  ],
  templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.scss'
})
export class RoleListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'actions'];
  dataSource = new MatTableDataSource<Role>([]);
  loading = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private roleService: RoleService,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadRoles();
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

  loadRoles() {
    this.loading = true;
    this.roleService
      .getRoles()
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(
        (roles) => {
          this.dataSource.data = roles;
        },
        (error) => {
          this.notificationService.error(`Failed to load roles`);
        }
      );
  }

  openRoleForm(role?: Role) {
    const dialogRef = this.dialog.open(AddEditRoleComponent, {
      width: '500px',
      data: { role }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadRoles();
      }
    });
  }

  deleteRole(role: Role) {
    const dialogRef = this.dialog.open(AddEditRoleComponent, {
      width: '400px',
      data: {
        title: 'Confirm Delete',
        message: `Are you sure you want to delete role "${role.name}"?`,
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.roleService.deleteRole(role.roleId).subscribe(
          () => {
            this.notificationService.success(`Role deleted successfully`);
            this.loadRoles();
          },
          (error) => {
            this.notificationService.success(`Failed to delete role`);
          }
        );
      }
    });
  }

  viewUsers(role: Role) {
    // This would typically open a dialog showing users with this role
    // For this example, we'll just show a toast
    // this.toastr.info(`View users with role "${role.name}" functionality would be implemented here`, 'Information');
  }
}
