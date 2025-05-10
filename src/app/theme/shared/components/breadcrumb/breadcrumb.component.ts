import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd, Event } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MenuItems } from '../../../../Models/menu-items.type';

interface Breadcrumb {
  url: string | false;
  title: string;
  type: string;
  breadcrumbs?: boolean;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
  navigationList: Breadcrumb[] = [];
  type: 'theme1' | 'theme2' = 'theme1';

  constructor(
    private router: Router,
    private titleService: Title
  ) {
    this.initBreadcrumb();
  }

  initBreadcrumb() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const path = event.urlAfterRedirects;
        const list = this.generateBreadcrumb(MenuItems, path);
        this.navigationList = list;
        const pageTitle = list[list.length - 1]?.title || 'Welcome';
        this.titleService.setTitle(`${pageTitle} | Iron Forge Fitness`);
      }
    });
  }

  generateBreadcrumb(items: any[], url: string): Breadcrumb[] {
    for (const item of items) {
      if (item.route === url) {
        return [{ url: item.route, title: item.title, type: 'item', breadcrumbs: true }];
      }
      if (item.children) {
        const childTrail = this.generateBreadcrumb(item.children, url);
        if (childTrail.length > 0) {
          return [{ url: false, title: item.title, type: 'group', breadcrumbs: true }, ...childTrail];
        }
      }
    }
    return [];
  }
}
