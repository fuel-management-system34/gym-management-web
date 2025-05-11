import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-emergency-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './emergency-contact.component.html',
  styleUrls: ['./emergency-contact.component.scss']
})
export class EmergencyContactComponent {
  emergencyForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.emergencyForm = this.fb.group({
      contactName: ['', Validators.required],
      relationship: ['', Validators.required],
      phone: ['', [Validators.required]],
      email: ['', [Validators.email]],
      address: ['']
    });
  }

  onSubmit() {
    if (this.emergencyForm.valid) {
      console.log('Emergency Contact Info:', this.emergencyForm.value);
    }
  }
}
