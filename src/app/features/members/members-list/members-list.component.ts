import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-members-list',
  standalone: true,
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.scss'],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatToolbarModule,
    MatButtonModule,
    ReactiveFormsModule
  ]
})
export class MembersListComponent implements OnInit {
  filterForm: FormGroup;
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'membership', 'joinDate', 'status'];
  dataSource = new MatTableDataSource<Member>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      name: [''],
      email: ['']
    });
  }

  ngOnInit(): void {
    this.dataSource.data = MEMBER_DATA;

    this.filterForm.valueChanges.subscribe(values => {
      this.applyFilter(values);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(values: any) {
    this.dataSource.filterPredicate = (data: Member, filter: string): boolean => {
      const filters = JSON.parse(filter);
      return (
        data.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        data.email.toLowerCase().includes(filters.email.toLowerCase())
      );
    };
    this.dataSource.filter = JSON.stringify(values);
  }
}

export interface Member {
  id: number;
  name: string;
  email: string;
  phone: string;
  membership: string;
  joinDate: string;
  status: string;
}

const MEMBER_DATA: Member[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', membership: 'Gold', joinDate: '2023-01-15', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '555-123-4567', membership: 'Silver', joinDate: '2022-12-01', status: 'Inactive' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '999-888-7777', membership: 'Platinum', joinDate: '2023-02-20', status: 'Active' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', phone: '777-666-5555', membership: 'Gold', joinDate: '2023-03-05', status: 'Active' },
  { id: 5, name: 'Tom Hardy', email: 'tom@example.com', phone: '321-654-0987', membership: 'Basic', joinDate: '2023-04-01', status: 'Pending' }
];
