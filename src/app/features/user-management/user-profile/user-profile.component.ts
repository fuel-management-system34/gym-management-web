import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipListboxChange, MatChipsModule } from '@angular/material/chips';
import { MatCommonModule } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { finalize } from 'rxjs';
import { User } from 'src/app/Core/models/User';
import { AuthService } from 'src/app/Core/services/auth.service';
import { UserService } from 'src/app/Core/services/user.service';

@Component({
  selector: 'app-user-profile',
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
    MatProgressSpinnerModule,
    MatChipsModule,
    MatSelectModule
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  profileForm: FormGroup;
  currentUser: User;
  loading = false;
  updating = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    //private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadUserProfile();
  }

  initializeForm(): void {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: [''],
      preferredLanguage: ['en']
    });
  }

  loadUserProfile(): void {
    this.loading = true;
    this.authService.currentUser.subscribe(
      (user) => {
        this.loading = false;
        if (user) {
          this.currentUser = user;
          this.profileForm.patchValue({
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            preferredLanguage: user.preferredLanguage
          });
        }
      },
      (error) => {
        this.loading = false;
        // this.toastr.error('Failed to load user profile', 'Error');
        console.error('Error loading profile:', error);
      }
    );
  }

  updateProfile(): void {
    if (this.profileForm.invalid) {
      return;
    }

    this.updating = true;
    const formValues = this.profileForm.value;

    const updateData = {
      userId: this.currentUser.userId,
      username: this.currentUser.username,
      email: this.currentUser.email,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      phoneNumber: formValues.phoneNumber,
      preferredLanguage: formValues.preferredLanguage,
      isActive: this.currentUser.isActive,
      roleIds: [] // We don't update roles through profile
    };

    this.userService
      .updateProfile(updateData)
      .pipe(
        finalize(() => {
          this.updating = false;
        })
      )
      .subscribe(
        () => {
          // this.toastr.success('Profile updated successfully', 'Success');
          // Reload user profile to get updated data
          this.authService.loadUserProfile();
        },
        (error) => {
          //  this.toastr.error('Failed to update profile', 'Error');
          console.error('Error updating profile:', error);
        }
      );
  }

  // openChangePasswordDialog(): void {
  //   const dialogRef = this.dialog.open(ChangePasswordComponent, {
  //     width: '400px',
  //     data: { userId: this.currentUser.userId }
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       // Password changed successfully
  //       this.toastr.success('Password changed successfully', 'Success');
  //     }
  //   });
  // }
}
