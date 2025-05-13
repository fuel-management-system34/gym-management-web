import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { SkeletonLoaderTableComponent } from 'src/app/shared/components/skeleton-loader-table/skeleton-loader-table.component';
import { BreadcrumbComponent } from 'src/app/theme/shared/components/breadcrumb/breadcrumb.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { User } from 'src/app/Core/models/User';

@Component({
  selector: 'app-site-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    ReactiveFormsModule,
    SharedModule,
    MatDialogModule
  ],
  templateUrl: './site-dashboard.component.html',
  styleUrl: './site-dashboard.component.scss'
})
export class SiteDashboardComponent implements OnInit {
  companyForm!: FormGroup;
  logoPreview: string | ArrayBuffer | null = null;
  selectedFileName: string | null = null;
  membershipPreview: string | ArrayBuffer | null = null;
  logoFile!: File;
  membershipCardFile!: File;

  constructor(
    private fb: FormBuilder,
    //private companyService: CompanyService,
    private dialogRef: MatDialogRef<SiteDashboardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User }
  ) {}

  ngOnInit(): void {
    this.companyForm = this.fb.group({
      name: [''],
      telephone: [''],
      address: [''],
      site: ['']
    });

    // this.companyService.getCompanyDetails().subscribe((data) => {
    //   this.companyForm.patchValue(data);
    //   this.logoPreview = data.logo_url;
    //   this.membershipPreview = data.membership_card_url;
    // });
  }

  onFileChange(event: Event, field: string): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      this.selectedFileName = file.name;

      const reader = new FileReader();
      reader.onload = () => {
        if (field === 'logo') {
          this.logoPreview = reader.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    Object.entries(this.companyForm.value).forEach(([key, value]) => formData.append(key, value as string));
    if (this.logoFile) formData.append('logo', this.logoFile);
    if (this.membershipCardFile) formData.append('membership_card', this.membershipCardFile);

    // this.companyService.updateCompanyDetails(formData).subscribe((response) => {
    //   console.log('Updated successfully', response);
    // });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
