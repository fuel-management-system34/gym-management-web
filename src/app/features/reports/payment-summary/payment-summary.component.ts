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
  selector: 'app-payment-summary',
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
  templateUrl: './payment-summary.component.html',
  styleUrls: ['./payment-summary.component.scss']
})
export class PaymentSummaryComponent implements OnInit {
  filterControl = new FormControl('');
  displayedColumns: string[] = ['code', 'member', 'amount', 'date'];
  dataSource = new MatTableDataSource<PaymentReport>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dummyReports: PaymentReport[] = [
    { code: 'PAY001', member: 'John Doe', amount: 120.0, date: '2024-05-01' },
    { code: 'PAY002', member: 'Jane Smith', amount: 150.0, date: '2024-05-02' },
    { code: 'PAY003', member: 'Alice Johnson', amount: 100.0, date: '2024-05-03' },
    { code: 'PAY004', member: 'Bob Brown', amount: 90.0, date: '2024-05-04' }
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

interface PaymentReport {
  code: string;
  member: string;
  amount: number;
  date: string;
}
