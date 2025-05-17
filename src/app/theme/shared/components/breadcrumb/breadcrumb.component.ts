import { Component, Input } from '@angular/core';
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
  icon: string;
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
  @Input() topValue: number;
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

  initBreadcrumb(): void {
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
    const segments = url.split('/').filter(Boolean);
    const trail: Breadcrumb[] = [];

    const findTrail = (nodes: any[], pathSoFar: string): boolean => {
      for (const node of nodes) {
        if (!node.route) continue;

        const nodeSegments = node.route.split('/').filter(Boolean);
        let match = true;
        for (let i = 0; i < nodeSegments.length; i++) {
          if (!segments[i]) {
            match = false;
            break;
          }
          if (nodeSegments[i].startsWith(':')) continue; // dynamic
          if (nodeSegments[i] !== segments[i]) {
            match = false;
            break;
          }
        }

        if (match) {
          const actualUrl = '/' + segments.slice(0, nodeSegments.length).join('/');
          trail.push({
            url: node.route.includes(':') ? false : actualUrl, // don't link dynamic param segments
            title: node.title,
            type: 'item',
            icon: node.icon,
            breadcrumbs: true
          });

          if (node.children) {
            const found = findTrail(node.children, actualUrl);
            if (found) return true;
          }

          if (segments.length === nodeSegments.length) return true;
          trail.pop(); // backtrack
        }
      }
      return false;
    };

    findTrail(items, '');
    return trail;
  }

  toolbarBtnClick(toolbarButton: ToolbarButton): void {
    this.toolbarService.clickButton$.next(toolbarButton);
  }
}
