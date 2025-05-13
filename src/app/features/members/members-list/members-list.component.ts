import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import { RouterModule, Router, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MemberApiService } from '../../../Services/api/member-api.service';
import { Member } from '../../workout plans/workout-plans-dashboard/workout-plans-dashboard.component';
import { ToolbarService } from '../../../Core/services/toolbar.service';
import { ToolbarButtons } from '../../../Core/const/common-toolbar-buttons';
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
    ReactiveFormsModule,
    RouterModule,
    MatIconModule
  ]
})
export class MembersListComponent implements OnInit, OnDestroy {
  filterForm: FormGroup;
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'membership', 'joinDate', 'status'];
  dataSource = new MatTableDataSource<Member>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    private memberService: MemberApiService,
    private toolbarService: ToolbarService,
    private routes: Router
  ) {
    this.filterForm = this.fb.group({
      name: [''],
      email: ['']
    });
  }

  ngOnInit(): void {
    this.loadMembers();
    this.setToolBar();
  }

  setToolBar(): void {
    this.toolbarService.reset();
    this.toolbarService.setVisible([ToolbarButtons.New, ToolbarButtons.Refresh]);
    this.toolbarService.clickButton$.subscribe((res) => {
      if (res) {
        switch (res) {
          case ToolbarButtons.New:
            this.routes.navigate(['/members/new']);
            break;
          case ToolbarButtons.Refresh:
            this.loadMembers();
            break;
        }
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadMembers(): void {
    ToolbarButtons.Refresh.isLoading = true;
    this.memberService.getAllMembers().subscribe({
      next: (members) => {
        this.dataSource.data = members;
        ToolbarButtons.Refresh.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load members:', err);
        ToolbarButtons.Refresh.isLoading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.toolbarService.reset();
  }
}
