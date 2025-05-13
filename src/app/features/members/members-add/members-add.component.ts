import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-member-add',
  standalone: true,
  templateUrl: './members-add.component.html',
  styleUrls: ['./members-add.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatDatepickerModule
  ]
})
export class MembersAddComponent implements OnInit, OnDestroy {
  memberForm: FormGroup;

  private fb = inject(FormBuilder);
  private memberService = inject(MemberApiService);
  private location = inject(Location);
  private notificationService = inject(NotificationService);
  private router = inject(Router);
  private subscriptions = new Subscription();

  constructor() {
    this.createForm();
  }

  ngOnInit(): void {}

  createForm(): void {
    this.memberForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      gender: ['', Validators.required],
      weight: ['', Validators.required],
      height: ['', Validators.required],
      address: [''],
      emergency_contact_name: [''],
      emergency_contact_phone: [''],
      emergency_contact_relationship: ['']
    });
  }

  onSubmit(): void {
    if (this.memberForm.valid) {
      const formValues = this.memberForm.value;
      const mappedValues = this.mapValuesForBind(formValues);
      this.subscriptions.add(
        this.memberService.addMember(this.memberForm.value).subscribe({
          next: () => {
            this.notificationService.success('Member added successfully');
            this.router.navigate(['/members']);
          },
          error: () => {
            this.notificationService.error('Error adding member');
          }
        })
      );
    } else {
      console.log('invalid from');
    }
  }

  mapValuesForBind(formValues: any): any {
    const mappedValues = {
      first_name: formValues.first_name,
      last_name: formValues.last_name,
      email: formValues.email,
      phone_number: formValues.phone_number,
      date_of_birth: new Date(formValues.date_of_birth).toISOString(),
      gender: formValues.gender,
      height: formValues.height,
      weight: formValues.weight,
      address: formValues.address,
      emergency_contact_name: formValues.emergency_contact_name,
      emergency_contact_phone: formValues.emergency_contact_phone,
      emergency_contact_relationship: formValues.emergency_contact_relationship,
      current_active_workout_plan_id: formValues.current_active_workout_plan_id,
      workout_plan_history_id: formValues.workout_plan_history_id,
      preferred_workout_type_id: formValues.preferred_workout_type_id,
      is_active: 1,
      is_deleted: 0,
      created_at: new Date().toISOString()
    };
    return mappedValues;
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
