import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItems } from '../../../Models/menu-items.type';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class SidebarComponent {
  isCollapsed = false;
  menu = MenuItems;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  expandedGroups = new Set<string>();

  toggleGroup(item: any): void {
    if (this.expandedGroups.has(item.title)) {
      this.expandedGroups.delete(item.title);
    } else {
      this.expandedGroups.add(item.title);
    }
  }
}
