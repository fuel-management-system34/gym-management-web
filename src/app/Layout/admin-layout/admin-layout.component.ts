import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../../theme/shared/components/breadcrumb/breadcrumb.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, NavBarComponent, AdminSidebarComponent, BreadcrumbComponent, RouterOutlet],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminComponent {}
