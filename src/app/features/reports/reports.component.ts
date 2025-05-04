import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ReportDialogComponent } from './report-dialog/report-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, RouterModule, MatTabsModule, MatToolbarModule, MatIconModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {
  constructor(
    private router: Router,
    private location: Location,
    private dialog: MatDialog
  ) {}

  navigateToTab(index: number) {
    const paths = ['attendance', 'payments', 'trainerPerformance', 'classEnrollment', 'sales'];
    this.router.navigate([paths[index]]);
  }

  goBack(): void {
    this.location.back();
  }

  openNewReportDialogBox(): void {
    const dialogRef = this.dialog.open(ReportDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Report Data:', result);
        // Trigger report generation logic here
      }
    });
  }
}
