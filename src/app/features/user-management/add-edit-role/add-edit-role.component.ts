import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { Role } from '../../../Core/models/Role';
import { RoleService } from '../../../Core/services/role.service';
import { NotificationService } from 'src/app/Services/notification-util.service';

@Component({
  selector: 'app-add-edit-role',
  standalone: true,
  imports: [],
  templateUrl: './add-edit-role.component.html',
  styleUrl: './add-edit-role.component.scss'
})
export class AddEditRoleComponent implements OnInit {
  roleForm: FormGroup;
  isEdit = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<AddEditRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { role?: Role }
  ) {}

  ngOnInit(): void {
    this.isEdit = !!this.data.role;
    this.initializeForm();
  }

  initializeForm(): void {
    this.roleForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['']
    });

    if (this.isEdit && this.data.role) {
      this.roleForm.patchValue({
        name: this.data.role.name,
        description: this.data.role.description
      });
    }
  }

  onSubmit(): void {
    if (this.roleForm.invalid) {
      return;
    }

    this.loading = true;
    const formValues = this.roleForm.value;

    if (this.isEdit) {
      const updateRoleData = {
        roleId: this.data.role.roleId,
        name: formValues.name,
        description: formValues.description
      };

      this.roleService
        .updateRole(updateRoleData)
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        )
        .subscribe(
          () => {
            this.notificationService.success(`Role updated successfully`);
            this.dialogRef.close(true);
          },
          (error) => {
            this.notificationService.error(`Error updating role`);
          }
        );
    } else {
      const createRoleData = {
        name: formValues.name,
        description: formValues.description
      };

      this.roleService
        .createRole(createRoleData)
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        )
        .subscribe(
          () => {
            this.notificationService.success(`Role created successfully`);
            this.dialogRef.close(true);
          },
          (error) => {
            this.notificationService.error(`Failed to create role`);
            console.error('Error creating role:', error);
          }
        );
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
