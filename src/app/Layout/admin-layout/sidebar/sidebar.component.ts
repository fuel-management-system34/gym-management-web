import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MenuItems } from '../../../Models/menu-items.type';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isCollapsed = false;
  searchControl: FormControl = new FormControl('');
  filteredItems = MenuItems;

  constructor(public router: Router) {}

  isActiveRoute(route: string): boolean {
    return this.router.url.startsWith(route);
  }

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

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(debounceTime(200)).subscribe((term: string) => {
      const search = term.toLowerCase().trim();
      if (!search) {
        this.filteredItems = MenuItems;
        return;
      }

      this.filteredItems = MenuItems.map((item) => {
        if (item.children) {
          const filteredChildren = item.children.filter((child: any) => child.title.toLowerCase().includes(search));
          if (filteredChildren.length > 0) {
            return { ...item, children: filteredChildren };
          }
        } else if (item.title.toLowerCase().includes(search)) {
          return item;
        }
        return null;
      }).filter(Boolean);
    });
  }
}
