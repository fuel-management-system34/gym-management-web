import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd, Event } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MenuItems } from '../../../../Models/menu-items.type';
import { ToolbarService } from '../../../../Core/services/toolbar.service';
import { ToolbarButton } from 'src/app/Core/models/toolbar-button.type';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

interface Breadcrumb {
  url: string | false;
  title: string;
  type: string;
  breadcrumbs?: boolean;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatProgressSpinner],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
  navigationList: Breadcrumb[] = [];
  toolbarButtons: ToolbarButton[] = [];

  constructor(
    private router: Router,
    private titleService: Title,
    private toolbarService: ToolbarService
  ) {
    this.initBreadcrumb();

    this.toolbarService.visibleBtns$.subscribe((actions) => {
      this.toolbarButtons = actions;
    });
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

  toolbarBtnClick(toolbarButton: ToolbarButton): void {
    this.toolbarService.clickButton$.next(toolbarButton);
  }
}
