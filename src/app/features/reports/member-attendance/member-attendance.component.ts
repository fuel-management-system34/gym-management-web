import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-member-attendance',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatTableModule],
  templateUrl: './member-attendance.component.html',
  styleUrl: './member-attendance.component.scss'
})
export class MemberAttendanceComponent {
  reportCodeControl = new FormControl('');
  columnsToDisplay = ['code', 'description'];

  reports = [
    { code: 'ATT001', description: 'January Attendance' },
    { code: 'ATT002', description: 'February Attendance' },
    { code: 'ATT003', description: 'March Attendance' }
  ];

  get filteredReports() {
    const filter = this.reportCodeControl.value?.toLowerCase() || '';
    return this.reports.filter((r) => r.code.toLowerCase().includes(filter));
  }
}
