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
  selector: 'app-sales',
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
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
  filterControl = new FormControl('');
  displayedColumns: string[] = ['saleCode', 'item', 'member', 'amount', 'date'];
  dataSource = new MatTableDataSource<Sale>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dummySales: Sale[] = [
    { saleCode: 'SAL001', item: 'Protein Shake', member: 'John Doe', amount: 12.99, date: '2024-05-01' },
    { saleCode: 'SAL002', item: 'Gym Towel', member: 'Jane Smith', amount: 7.5, date: '2024-05-02' },
    { saleCode: 'SAL003', item: 'Water Bottle', member: 'Bob Brown', amount: 5.0, date: '2024-05-03' },
    { saleCode: 'SAL004', item: 'Whey Protein', member: 'Alice Johnson', amount: 45.0, date: '2024-05-04' }
  ];

  ngOnInit(): void {
    this.dataSource.data = this.dummySales;

    this.filterControl.valueChanges.subscribe((value) => {
      this.dataSource.filter = value?.trim().toLowerCase() || '';
    });

    this.dataSource.filterPredicate = (data, filter) => data.saleCode.toLowerCase().includes(filter);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}

interface Sale {
  saleCode: string;
  item: string;
  member: string;
  amount: number;
  date: string;
}
