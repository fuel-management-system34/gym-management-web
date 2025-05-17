import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ToolbarService } from '../../../../Core/services/toolbar.service';
import { ToolbarButtons } from '../../../../Core/const/common-toolbar-buttons';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../../../Services/notification-util.service';
import { Holiday } from '../../../../Models/holiday.type';

@Component({
  selector: 'app-holiday-add-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatDatepickerModule,
    MatCheckboxModule
  ],
  templateUrl: './holiday-add-edit.component.html',
  styleUrl: './holiday-add-edit.component.scss'
})
export class HolidayAddEditComponent implements OnInit {
  holidayForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toolbarService: ToolbarService,
    private routes: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.setupToolbar();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchPackage(+id);
    }
  }
  setupToolbar() {
    this.toolbarService.reset();
    this.toolbarService.setVisible([ToolbarButtons.SaveAndClose]);
    this.toolbarService.clickButton$.subscribe((res) => {
      if (res) {
        switch (res) {
          case ToolbarButtons.SaveAndClose:
            this.savePackage();
            break;
        }
      }
    });
  }

  createForm(): void {
    this.holidayForm = this.fb.group({
      holidayId: [null],
      holidayName: ['', Validators.required],
      date: ['', Validators.required],
      description: ['', Validators.required],
      isRecurring: [false, Validators.required],
      isActive: [false, Validators.required]
    });
  }

  savePackage() {
    if (this.holidayForm.valid) {
      const payload: Holiday = this.holidayForm.value;
      this.http.post('/api/packages', payload).subscribe({
        next: (res) => {
          this.notificationService.success('Package Saved Successfully!', 'Sucess');
        },
        error: (err) => {
          this.notificationService.error('Package Save Unsuccessful!', 'Error');
        }
      });
    } else {
      this.holidayForm.markAllAsTouched();
    }
  }

  fetchPackage(id: number) {
    this.http.get<Holiday>(`/api/packages/${id}`).subscribe((holiday) => {
      this.holidayForm.patchValue(holiday);
    });
  }
}
