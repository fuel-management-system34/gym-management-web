import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ToolbarService } from '../../../Core/services/toolbar.service';
import { Router, RouterModule } from '@angular/router';
import { ToolbarButtons } from '../../../Core/const/common-toolbar-buttons';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Package } from '../../../Models/package.type';
import { PackageApiService } from '../../../Services/api/package-api.service';

@Component({
  selector: 'app-package-list',
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
    MatIconModule
  ],
  templateUrl: './package-list.component.html',
  styleUrl: './package-list.component.scss'
})
export class PackageListComponent {
  filterForm: FormGroup;
  displayedColumns: string[] = ['PackageId', 'PackageName', 'PackageType'];
  dataSource = new MatTableDataSource<Package>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    private packageApiService: PackageApiService,
    private toolbarService: ToolbarService,
    private routes: Router
  ) {
    this.filterForm = this.fb.group({
      packageName: [''],
      packageType: []
    });
  }

  ngOnInit(): void {
    this.loadPackages();
    this.setToolBar();
  }

  setToolBar(): void {
    this.toolbarService.reset();
    this.toolbarService.setVisible([ToolbarButtons.New, ToolbarButtons.Refresh]);
    this.toolbarService.clickButton$.subscribe((res) => {
      if (res) {
        switch (res) {
          case ToolbarButtons.New:
            this.routes.navigate(['/packages/new']);
            break;
          case ToolbarButtons.Refresh:
            this.loadPackages();
            break;
        }
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadPackages(): void {
    ToolbarButtons.Refresh.isLoading = true;
    this.packageApiService.getPackages().subscribe({
      next: (packages) => {
        this.dataSource.data = packages;
        ToolbarButtons.Refresh.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load packages:', err);
        ToolbarButtons.Refresh.isLoading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.toolbarService.reset();
  }
}
