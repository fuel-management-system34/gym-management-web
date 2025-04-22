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
      // Call the service to add the member to the database
      this.memberService.addMember(this.memberForm.value).subscribe(
        (response) => {
          console.log('Member added successfully', response);
          // Optionally reset the form or navigate elsewhere
        },
        (error) => {
          console.error('Error adding member', error);
        }
      );
    }
  }

  goBack(): void {
    this.location.back();
  }
}
