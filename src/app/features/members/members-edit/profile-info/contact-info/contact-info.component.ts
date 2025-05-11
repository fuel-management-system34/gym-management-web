import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-contact-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss']
})
export class ContactInfoComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      phone: ['', Validators.required],
      altPhone: [''],
      email: ['', [Validators.required, Validators.email]],
      emergencyName: [''],
      emergencyPhone: [''],
      address: [''],
      city: [''],
      state: [''],
      zip: ['']
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Contact Info:', this.contactForm.value);
    }
  }
}
