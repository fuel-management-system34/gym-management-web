import { Component, ChangeDetectionStrategy, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { Observable, of, combineLatest } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { ToolbarService } from '../../../Core/services/toolbar.service';
import { ToolbarButtons } from '../../../Core/const/common-toolbar-buttons';

interface StaffMember {
  id: number;
  name: string;
  role: 'Trainer' | 'Receptionist' | 'Manager';
  email: string;
  phone: string;
  experience: number; // in years
}

@Component({
  selector: 'app-trainers-staff-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatToolbarModule,
    RouterModule
  ],
  templateUrl: './trainers-list.component.html',
  styleUrls: ['./trainers-list.component.scss']
})
export class TrainersListComponent implements OnInit, OnDestroy {
  constructor(
    private toolbarService: ToolbarService,
    private routes: Router
  ) {}

  ngOnInit(): void {
    this.setToolBar();
  }
  private fb = inject(FormBuilder);

  // Mock staff data (replace with API in real app)
  staff$: Observable<StaffMember[]> = of([
    { id: 1, name: 'Alice', role: 'Trainer', email: 'alice@gym.com', phone: '1234567890', experience: 5 },
    { id: 2, name: 'Bob', role: 'Receptionist', email: 'bob@gym.com', phone: '1234567891', experience: 2 },
    { id: 3, name: 'Charlie', role: 'Manager', email: 'charlie@gym.com', phone: '1234567892', experience: 8 },
    { id: 4, name: 'Dana', role: 'Trainer', email: 'dana@gym.com', phone: '1234567893', experience: 4 }
  ]);

  filterForm = this.fb.group({
    search: [''],
    role: ['']
  });

  readonly displayedColumns = ['name', 'role', 'email', 'phone', 'experience', 'actions'];

  filteredStaff$: Observable<StaffMember[]> = combineLatest([
    this.staff$,
    this.filterForm.valueChanges.pipe(startWith(this.filterForm.value))
  ]).pipe(
    map(([staff, filters]) => {
      const search = (filters.search ?? '').toLowerCase();
      const role = filters.role;

      return staff.filter(
        (member) =>
          (role ? member.role === role : true) &&
          (search ? member.name.toLowerCase().includes(search) || member.email.toLowerCase().includes(search) : true)
      );
    })
  );

  clearFilters() {
    this.filterForm.reset();
  }

  setToolBar(): void {
    this.toolbarService.reset();
    this.toolbarService.setVisible([ToolbarButtons.New, ToolbarButtons.Refresh, ToolbarButtons.Export]);
    this.toolbarService.clickButton$.subscribe((res) => {
      if (res) {
        switch (res) {
          case ToolbarButtons.New:
            this.routes.navigate(['/trainers/new']);
            break;
          case ToolbarButtons.Refresh:
            //this.loadMembers();
            break;
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.toolbarService.reset();
  }
}
