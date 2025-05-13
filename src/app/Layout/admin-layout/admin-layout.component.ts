import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../../theme/shared/components/breadcrumb/breadcrumb.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { QuickPanelComponent } from './quick-panel/quick-panel.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, NavBarComponent, SidebarComponent, BreadcrumbComponent, RouterOutlet, QuickPanelComponent, FooterComponent],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminComponent {}
