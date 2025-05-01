import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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
import { AddEditUserComponent } from '../../user-management/add-edit-user/add-edit-user.component';

@Component({
  selector: 'app-add-edit-event',
  templateUrl: './add-edit-event.component.html',
  styleUrls: ['./add-edit-event.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSort,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    ReactiveFormsModule,
    AddEditUserComponent,
    ConfirmDialogComponent,
    SharedModule,
    BreadcrumbComponent,
    SkeletonLoaderTableComponent
  ]
})
export class AddEditEventComponent {
  title = '';
  start: string;
  end: string;

  constructor(
    public dialogRef: MatDialogRef<AddEditEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data.event) {
      this.title = data.event.title;
      this.start = data.event.startStr;
      this.end = data.event.endStr;
    } else if (data.date) {
      this.start = data.date;
      this.end = data.date;
    }
  }

  save() {
    this.dialogRef.close({
      title: this.title,
      start: this.start,
      end: this.end
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}
