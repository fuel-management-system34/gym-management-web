import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-performance-report',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  templateUrl: './trainer-performance.component.html',
  styleUrl: './trainer-performance.component.scss'
})
export class TrainerPerformanceComponent implements OnInit {
  filterControl = new FormControl('');
  displayedColumns: string[] = ['code', 'member', 'workoutType', 'score', 'date'];
  dataSource = new MatTableDataSource<PerformanceReport>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dummyReports: PerformanceReport[] = [
    { code: 'PRF001', member: 'John Doe', workoutType: 'Cardio', score: 80, date: '2024-04-30' },
    { code: 'PRF002', member: 'Jane Smith', workoutType: 'Strength', score: 92, date: '2024-05-01' },
    { code: 'PRF003', member: 'Bob Brown', workoutType: 'HIIT', score: 75, date: '2024-05-02' },
    { code: 'PRF004', member: 'Alice Johnson', workoutType: 'Yoga', score: 88, date: '2024-05-03' }
  ];

  ngOnInit(): void {
    this.dataSource.data = this.dummyReports;

    this.filterControl.valueChanges.subscribe((value) => {
      this.dataSource.filter = value?.trim().toLowerCase() || '';
    });

    this.dataSource.filterPredicate = (data, filter) => data.code.toLowerCase().includes(filter);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}

interface PerformanceReport {
  code: string;
  member: string;
  workoutType: string;
  score: number;
  date: string;
}
