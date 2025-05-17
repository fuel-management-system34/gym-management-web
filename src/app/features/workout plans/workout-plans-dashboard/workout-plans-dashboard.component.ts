import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { AddEditWorkoutPlansComponent } from '../add-edit-workout-plans/add-edit-workout-plans.component';
import { Member } from '../../../Models/member/member.type';

@Component({
  selector: 'app-workout-plans-dashboard',
  templateUrl: './workout-plans-dashboard.component.html',
  styleUrls: ['./workout-plans-dashboard.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatToolbarModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule,
    MatMenuModule
  ]
})
export class WorkoutPlansDashboardComponent implements OnInit {
  filterForm: FormGroup;
  displayedColumns: string[] = ['id', 'name', 'description', 'phone', 'status', 'action'];
  dataSource = new MatTableDataSource<Member>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.filterForm = this.fb.group({
      name: [''],
      email: ['']
    });
  }

  ngOnInit(): void {
    this.dataSource.data = MEMBER_DATA;

    this.filterForm.valueChanges.subscribe((values) => {
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
      return data.name.toLowerCase().includes(filters.name.toLowerCase()) && data.email.toLowerCase().includes(filters.email.toLowerCase());
    };
    this.dataSource.filter = JSON.stringify(values);
  }

  openSiteForm(user?: any): void {
    const dialogRef = this.dialog.open(AddEditWorkoutPlansComponent, {
      width: '1100px',
      data: { user }
    });

    dialogRef.afterClosed().subscribe((result) => {
      //if (result) this.loadUsers();
    });
  }
}

const MEMBER_DATA: any[] = [
  {
    id: 1,
    name: 'Piliyandala',
    description: 'Power world',
    phone: '123-456-7890',
    status: 'Active'
  }
];
