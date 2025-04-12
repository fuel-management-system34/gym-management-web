import { ConfirmDialogComponent } from './../../../shared/components/confirm-dialog/confirm-dialog.component';
import { CommonModule } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCommonModule, MatNativeDateModule } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { finalize, Subscription } from 'rxjs';
import { Role } from '../../../Core/models/Role';
import { User } from '../../../Core/models/User';
import { RoleService } from '../../../Core/services/role.service';
import { UserService } from '../../../Core/services/user.service';
import { CreateUserRequest } from '../../../Core/models/CreateUserRequest ';
import { UpdateUserRequest } from '../../../Core/models/UpdateUserRequest ';
import { ToastrService } from 'ngx-toastr';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatIconModule,
    MatCardModule,
    SharedModule,
    MatChipsModule
  ]
})
export class AddEditUserComponent implements OnInit, OnDestroy {
  userForm: FormGroup;
  availableRoles: Role[] = [];
  isEdit = false;
  loading = false;
  hide = true;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddEditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User },
    private userService: UserService,
    private roleService: RoleService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.isEdit = !!this.data.user;
    this.loadRoles();
    this.initializeForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadRoles(): void {
    const sub = this.roleService.getRoles().subscribe(
      (roles) => {
        this.availableRoles = roles;
      },
      () => {
        this.toastr.error('Failed to load roles', 'Error');
      }
    );
    this.subscriptions.add(sub);
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

      const sub = this.userService.getUserRoles(user.userId).subscribe((roles) => {
        const roleIds = this.availableRoles.filter((role) => roles.includes(role.name)).map((role) => role.roleId);

        this.userForm.patchValue({ roleIds });
      });

      this.subscriptions.add(sub);
    }
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    const formData = this.userForm.value;

    const request = this.isEdit ? this.userService.updateUser(formData) : this.userService.createUser(formData);

    const sub = request.subscribe({
      next: () => {
        this.loading = false;
        this.toastr.success(`User ${this.isEdit ? 'updated' : 'created'} successfully!`);
        this.dialogRef.close(true);
      },
      error: () => {
        this.loading = false;
        this.toastr.error('Something went wrong!', 'Error');
      }
    });

    this.subscriptions.add(sub);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
