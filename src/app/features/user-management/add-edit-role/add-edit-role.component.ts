import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { Role } from '../../../Core/models/Role';
import { RoleService } from '../../../Core/services/role.service';

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
    //private toastr: ToastrService,
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
            //this.toastr.success('Role updated successfully', 'Success');
            this.dialogRef.close(true);
          },
          (error) => {
            //this.toastr.error('Failed to update role', 'Error');
            console.error('Error updating role:', error);
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
            // this.toastr.success('Role created successfully', 'Success');
            this.dialogRef.close(true);
          },
          (error) => {
            //this.toastr.error('Failed to create role', 'Error');
            console.error('Error creating role:', error);
          }
        );
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
