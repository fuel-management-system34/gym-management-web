import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AvailableDays, Package, PackageTye } from '../../../Models/package.type';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ToolbarService } from '../../../Core/services/toolbar.service';
import { ToolbarButtons } from '../../../Core/const/common-toolbar-buttons';
import { ActivatedRoute, Router } from '@angular/router';
import {} from 'ngx-mat-timepicker';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { NotificationService } from 'src/app/Services/notification-util.service';

@Component({
  selector: 'app-package-add-edit',
  standalone: true,
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
    MatDatepickerModule,
    MatCheckboxModule,
    NgxMaterialTimepickerModule
  ],
  templateUrl: './package-add-edit.component.html',
  styleUrl: './package-add-edit.component.scss'
})
export class PackageAddEditComponent implements OnInit {
  packageForm!: FormGroup;
  availableDays = Object.keys(AvailableDays).filter((key) => isNaN(Number(key)));
  packageTypes = PackageTye;
  day: AvailableDays;

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
    this.packageForm = this.fb.group({
      packageId: [null],
      packageCode: [null],
      packageName: ['', Validators.required],
      packageType: [PackageTye.Individual, Validators.required],
      gender: [0, Validators.required],
      availableDays: this.fb.array<number>([], Validators.required),
      noTimeRange: [false],
      timeFrom: [null],
      timeTo: [null],
      packageDuration: [0, Validators.required],
      isRecurring: [false],
      minMembers: [2, Validators.required],
      maxMembers: [2, Validators.required],
      price: [0, [Validators.required, Validators.min(0)]]
    });
  }

  onCheckboxChange(event: any) {
    const formArray: FormArray = this.packageForm.get('availableDays') as FormArray;
    const value = +event.source.value;

    if (event.checked) {
      if (!formArray.value.includes(value)) {
        formArray.push(this.fb.control(value));
      }
    } else {
      const index = formArray.controls.findIndex((x) => x.value === value);
      if (index !== -1) {
        formArray.removeAt(index);
      }
    }
  }

  onTimeRangeChange(event: any) {
    if (event.checked) {
      this.packageForm.get('timeFrom')?.setValue(null);
      this.packageForm.get('timeTo')?.setValue(null);
      this.packageForm.get('timeFrom')?.setValidators([]);
      this.packageForm.get('timeTo')?.setValidators([]);
      this.packageForm.updateValueAndValidity();
    } else {
      this.packageForm.get('timeFrom')?.setValidators([Validators.required]);
      this.packageForm.get('timeTo')?.setValidators([Validators.required]);
      this.packageForm.updateValueAndValidity();
    }
  }

  savePackage() {
    if (this.packageForm.valid) {
      const payload: Package = this.packageForm.value;
      this.http.post('/api/packages', payload).subscribe({
        next: (res) => {
          this.notificationService.success('Package Saved Successfully!', 'Sucess');
        },
        error: (err) => {
          this.notificationService.error('Package Save Unsuccessful!', 'Error');
        }
      });
    } else {
      this.packageForm.markAllAsTouched();
    }
  }

  fetchPackage(id: number) {
    this.http.get<Package>(`/api/packages/${id}`).subscribe((pkg) => {
      this.packageForm.patchValue(pkg);
      const daysArray = this.packageForm.get('availableDays') as FormArray;
      pkg.AvailableDays.forEach((day) => daysArray.push(this.fb.control(day)));
    });
  }
}
