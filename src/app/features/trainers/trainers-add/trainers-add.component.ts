import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TrainerApiService } from '../../../Services/api/trainer-api.service';
import { Trainer } from '../../../Models/trainer/trainer.model';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

type TrainerForm = FormGroup<{
  name: FormControl<string>;
  role: FormControl<string>;
  email: FormControl<string>;
  phone: FormControl<string>;
  experience: FormControl<number>;
}>;

@Component({
  selector: 'app-add-trainer-staff',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatIconModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './trainers-add.component.html',
  styleUrls: ['./trainers-add.component.scss']
})
export class TrainersAddComponent {
  private fb = inject(FormBuilder);
  private staffService = inject(TrainerApiService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private location = inject(Location);

  staffForm: TrainerForm = this.fb.group({
    name: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
    role: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
    email: this.fb.control('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    phone: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
    experience: this.fb.control(0, { nonNullable: true, validators: [Validators.required, Validators.min(0)] })
  });

  onSubmit() {
    if (this.staffForm.invalid) {
      this.staffForm.markAllAsTouched();
      return;
    }

    const staff: Trainer = this.staffForm.getRawValue();

    this.staffService.addTrainer(staff).subscribe({
      next: () => {
        this.snackBar.open('Staff member added successfully!', 'Close', { duration: 3000 });
        this.router.navigate(['/staff']);
      },
      error: () => {
        this.snackBar.open('Failed to add staff member.', 'Close', { duration: 3000 });
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}
