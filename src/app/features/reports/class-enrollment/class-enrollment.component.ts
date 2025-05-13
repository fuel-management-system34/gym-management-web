import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-class-enrollment',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  templateUrl: './class-enrollment.component.html',
  styleUrls: ['./class-enrollment.component.scss']
})
export class ClassEnrollmentComponent implements OnInit {
  filterControl = new FormControl('');
  displayedColumns: string[] = ['enrollCode', 'member', 'className', 'enrollDate', 'status'];
  dataSource = new MatTableDataSource<ClassEnrollment>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dummyEnrollments: ClassEnrollment[] = [
    { enrollCode: 'ENR001', member: 'John Doe', className: 'Yoga', enrollDate: '2024-05-01', status: 'Active' },
    { enrollCode: 'ENR002', member: 'Jane Smith', className: 'HIIT', enrollDate: '2024-05-03', status: 'Completed' },
    { enrollCode: 'ENR003', member: 'Bob Brown', className: 'Zumba', enrollDate: '2024-05-04', status: 'Pending' },
    { enrollCode: 'ENR004', member: 'Alice Johnson', className: 'CrossFit', enrollDate: '2024-05-05', status: 'Active' }
  ];

  ngOnInit(): void {
    this.dataSource.data = this.dummyEnrollments;

    this.filterControl.valueChanges.subscribe((value) => {
      this.dataSource.filter = value?.trim().toLowerCase() || '';
    });

    this.dataSource.filterPredicate = (data, filter) => data.enrollCode.toLowerCase().includes(filter);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}

interface ClassEnrollment {
  enrollCode: string;
  member: string;
  className: string;
  enrollDate: string;
  status: string;
}
