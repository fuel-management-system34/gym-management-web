import { ConfirmDialogComponent } from './../../../shared/components/confirm-dialog/confirm-dialog.component';
import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCommonModule } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { finalize } from 'rxjs';
import { Role } from '../../../Core/models/Role';
import { User } from '../../../Core/models/User';
import { RoleService } from '../../../Core/services/role.service';
import { UserService } from '../../../Core/services/user.service';
import { CreateUserRequest } from '../../../Core/models/CreateUserRequest ';
import { UpdateUserRequest } from '../../../Core/models/UpdateUserRequest ';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule,
    ConfirmDialogComponent
  ]
})
export class AddEditUserComponent implements OnInit {
  userForm: FormGroup;
  availableRoles: Role[] = [];
  isEdit = false;
  loading = false;
  hide = true; // for password visibility toggle

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private roleService: RoleService,
    //private toastr: ToastrService,
    public dialogRef: MatDialogRef<AddEditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user?: User }
  ) {}

  ngOnInit(): void {
    this.isEdit = !!this.data.user;
    this.loadRoles();
    this.initializeForm();
  }

  initializeForm(): void {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: [''],
      preferredLanguage: ['en'],
      isActive: [true],
      roleIds: [[], Validators.required]
    });

    if (!this.isEdit) {
      // Password field is only required for new users
      this.userForm.addControl('password', this.fb.control('', [Validators.required, Validators.minLength(6)]));
    }

    if (this.isEdit && this.data.user) {
      const user = this.data.user;
      this.userForm.patchValue({
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        preferredLanguage: user.preferredLanguage,
        isActive: user.isActive
      });

      // We need to fetch the role IDs for this user
      this.userService.getUserRoles(user.userId).subscribe((roles) => {
        // Once we have the roles, we need to map them to role IDs
        this.loadRoles().then(() => {
          const roleIds = this.availableRoles.filter((role) => roles.includes(role.name)).map((role) => role.roleId);

          this.userForm.patchValue({ roleIds });
        });
      });
    }
  }

  loadRoles(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.roleService.getRoles().subscribe(
        (roles) => {
          this.availableRoles = roles;
          resolve();
        },
        (error) => {
          // this.toastr.error('Failed to load roles', 'Error');
          console.error('Error loading roles:', error);
          resolve();
        }
      );
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      return;
    }

    this.loading = true;
    const formValues = this.userForm.value;

    if (this.isEdit) {
      const updateUserData: UpdateUserRequest = {
        userId: this.data.user.userId,
        username: formValues.username,
        email: formValues.email,
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        phoneNumber: formValues.phoneNumber,
        preferredLanguage: formValues.preferredLanguage,
        isActive: formValues.isActive,
        roleIds: formValues.roleIds
      };

      this.userService
        .updateUser(updateUserData)
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        )
        .subscribe(
          () => {
            // this.toastr.success('User updated successfully', 'Success');
            this.dialogRef.close(true);
          },
          (error) => {
            //this.toastr.error('Failed to update user', 'Error');
            console.error('Error updating user:', error);
          }
        );
    } else {
      const createUserData: CreateUserRequest = {
        username: formValues.username,
        email: formValues.email,
        password: formValues.password,
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        phoneNumber: formValues.phoneNumber,
        preferredLanguage: formValues.preferredLanguage,
        roleIds: formValues.roleIds
      };

      this.userService
        .createUser(createUserData)
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        )
        .subscribe(
          () => {
            // this.toastr.success('User created successfully', 'Success');
            this.dialogRef.close(true);
          },
          (error) => {
            // this.toastr.error('Failed to create user', 'Error');
            console.error('Error creating user:', error);
          }
        );
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
