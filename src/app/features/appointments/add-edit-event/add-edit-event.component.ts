import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
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
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';

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
    MatSlideToggleModule,
    NgxMatTimepickerModule
  ]
})
export class AddEditEventComponent {
  title = '';
  service = '';
  description = '';
  members = '';
  trainer = '';
  start: string;
  end: string;

  constructor(
    public dialogRef: MatDialogRef<AddEditEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data.event) {
      const event = data.event;
      this.title = event.title?.split(' (')[0] || '';
      this.service = event.extendedProps?.service || '';
      this.description = event.extendedProps?.description || '';
      this.members = event.extendedProps?.members || '';
      this.trainer = event.extendedProps?.trainer || '';
      this.start = event.startStr;
      this.end = event.endStr;
    } else if (data.date) {
      this.start = data.date;
      this.end = data.date;
    }
  }

  save() {
    this.dialogRef.close({
      title: this.title,
      service: this.service,
      description: this.description,
      members: this.members,
      trainer: this.trainer,
      start: this.start,
      end: this.end
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}
