import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MemberApiService } from '../../../Services/api/member-api.service';
import { CommonModule, Location } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { NotificationService } from '../../../Services/notification-util.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-add',
  standalone: true,
  templateUrl: './members-add.component.html',
  styleUrls: ['./members-add.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule
  ]
})
export class MembersAddComponent {
  memberForm: FormGroup;

  private fb = inject(FormBuilder);
  private memberService = inject(MemberApiService);
  private location = inject(Location);
  private notificationService = inject(NotificationService);
  private router = inject(Router);

  constructor() {
    this.createForm();
  }

  createForm(): void {
    this.memberForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(18)]],
      gender: ['', [Validators.required]],
      membershipType: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.memberForm.valid) {
      this.memberService.addMember(this.memberForm.value).subscribe({
        next: () => {
          this.notificationService.success('Member added successfully');
          this.router.navigate(['/members']);
        },
        error: () => {
          this.notificationService.error('Error adding member');
        }
      });
    }
  }

  goBack(): void {
    this.location.back();
  }
}
