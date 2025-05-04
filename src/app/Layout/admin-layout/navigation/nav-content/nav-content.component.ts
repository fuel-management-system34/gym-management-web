import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { NavigationItem, NavigationItems } from '../navigation';
import { NgScrollbar } from 'ngx-scrollbar';
import { NavGroupComponent } from './nav-group/nav-group.component';
import { NavItemComponent } from './nav-item/nav-item.component';
import { LocationStrategy, Location, CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-content',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgScrollbar,
    NavGroupComponent,
    NavItemComponent
  ],
  templateUrl: './nav-content.component.html',
  styleUrls: ['./nav-content.component.scss']
})
export class NavContentComponent implements OnInit {
  @Output() NavCollapsedMob: EventEmitter<string> = new EventEmitter();
  navSearchText: string = '';
  navigations: NavigationItem[] = NavigationItems;
  windowWidth = window.innerWidth;
  navCollapsed: boolean;
  navCollapsedMob: boolean;
  filteredNavItems: NavigationItem[] = [];

  constructor(
    private location: Location,
    private locationStrategy: LocationStrategy
  ) {}

  ngOnInit() {
    if (this.windowWidth < 1025) {
      (document.querySelector('.coded-navbar') as HTMLDivElement).classList.add('menupos-static');
    }
    this.filteredNavItems = this.getFilteredNavigation();
  }

  onSearchChange() {
    this.filteredNavItems = this.getFilteredNavigation();
  }

  getFilteredNavigation(): NavigationItem[] {
    const keyword = this.navSearchText.toLowerCase().trim();
    if (!keyword) return this.navigations;

    const filterItems = (items: NavigationItem[]): NavigationItem[] => {
      return items
        .map((item) => {
          if (item.children?.length) {
            const filteredChildren = filterItems(item.children);
            return filteredChildren.length ? { ...item, children: filteredChildren } : null;
          }
          return item.title?.toLowerCase().includes(keyword) ? item : null;
        })
        .filter((item): item is NavigationItem => item !== null);
    };

    return filterItems(this.navigations);
  }

  fireOutClick() {
    let current_url = this.location.path();
    const baseHref = this.locationStrategy.getBaseHref();
    if (baseHref) {
      current_url = baseHref + this.location.path();
    }
    const link = "a.nav-link[ href='" + current_url + "' ]";
    const ele = document.querySelector(link);
    if (ele !== null && ele !== undefined) {
      const parent = ele.parentElement;
      const up_parent = parent?.parentElement?.parentElement;
      const last_parent = up_parent?.parentElement;
      if (parent?.classList.contains('coded-hasmenu')) {
        parent.classList.add('coded-trigger');
        parent.classList.add('active');
      } else if (up_parent?.classList.contains('coded-hasmenu')) {
        up_parent.classList.add('coded-trigger');
        up_parent.classList.add('active');
      } else if (last_parent?.classList.contains('coded-hasmenu')) {
        last_parent.classList.add('coded-trigger');
        last_parent.classList.add('active');
      }
    }
  }

  navMob() {
    if (this.windowWidth < 1025 && document.querySelector('app-navigation.coded-navbar').classList.contains('mob-open')) {
      this.NavCollapsedMob.emit();
    }
  }

  toggleSidebar() {
    this.navCollapsed = !this.navCollapsed;
    this.NavCollapsedMob.emit();
  }
}
