import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-health-goal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ],
  templateUrl: './health-goals.component.html',
  styleUrls: ['./health-goals.component.scss']
})
export class HealthGoalsComponent {
  goalForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.goalForm = this.fb.group({
      goalType: ['', Validators.required],
      targetWeight: [''],
      targetFat: [''],
      muscleMass: [''],
      frequency: ['', Validators.required],
      activities: [''],
      deadline: [''],
      notes: ['']
    });
  }

  onSubmit() {
    if (this.goalForm.valid) {
      console.log('Health Goal:', this.goalForm.value);
    }
  }
}
