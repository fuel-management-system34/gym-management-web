import { CommonModule } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/Services/notification-util.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Role } from '../../../../Core/models/Role';
import { User } from '../../../../Core/models/User';
import { RoleService } from '../../../../Core/services/role.service';
import { UserService } from '../../../../Core/services/user.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss'],
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
    MatChipsModule,
    MatDialogModule
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
    private notificationService: NotificationService
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
        this.notificationService.error(`Failed to load roles`);
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
        this.notificationService.success(`User ${this.isEdit ? 'updated' : 'created'} successfully!`);
        this.dialogRef.close(true);
      },
      error: () => {
        this.loading = false;
        this.notificationService.success(`Role updated successfully`);
      }
    });

    this.subscriptions.add(sub);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
