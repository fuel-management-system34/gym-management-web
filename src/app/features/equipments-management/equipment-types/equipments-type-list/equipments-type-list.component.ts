import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToolbarButtons } from 'src/app/Core/const/common-toolbar-buttons';
import { ToolbarService } from 'src/app/Core/services/toolbar.service';
import { EquipmentTypeService } from 'src/app/Services/api/equipment-type.service';
import { AddEditEquipmentTypeComponent } from '../add-edit-equipment-type/add-edit-equipment-type.component';

@Component({
  selector: 'app-equipments-type-list',
  templateUrl: './equipments-type-list.component.html',
  styleUrls: ['./equipments-type-list.component.css'],
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
    MatMenuModule,
    MatChipsModule
  ]
})
export class EquipmentsTypeListComponent implements OnInit, OnDestroy {
  filterForm: FormGroup;
  displayedColumns: string[] = ['id', 'name', 'CreatedOn', 'CreatedBy', 'Status', 'Action'];
  dataSource = new MatTableDataSource<any>();
  subscriptions = new Subscription();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    private equipmentService: EquipmentTypeService,
    private toolbarService: ToolbarService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.filterForm = this.fb.group({
      name: ['']
    });
  }

  ngOnInit(): void {
    this.loadEquipmentTypes();
    this.setupToolbar();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.toolbarService.reset();
    this.subscriptions.unsubscribe();
  }

  setupToolbar(): void {
    this.toolbarService.reset();
    this.toolbarService.setVisible([ToolbarButtons.New, ToolbarButtons.Refresh]);
    this.subscriptions.add(
      this.toolbarService.clickButton$.subscribe((action) => {
        if (action === ToolbarButtons.New) {
          this.openEquipmentTypeForm();
        } else if (action === ToolbarButtons.Refresh) {
          this.loadEquipmentTypes();
        }
      })
    );
  }

  loadEquipmentTypes(): void {
    ToolbarButtons.Refresh.isLoading = true;
    this.equipmentService.getAllEquipmentTypes().subscribe({
      next: (res) => {
        this.dataSource.data = res.data;
        ToolbarButtons.Refresh.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load equipment types:', err);
        ToolbarButtons.Refresh.isLoading = false;
      }
    });
  }

  openEquipmentTypeForm(type?: any): void {
    const dialogRef = this.dialog.open(AddEditEquipmentTypeComponent, {
      width: '800px',
      data: { type }
    });

    this.subscriptions.add(
      dialogRef.afterClosed().subscribe((result) => {
        if (result) this.loadEquipmentTypes();
      })
    );
  }
}
