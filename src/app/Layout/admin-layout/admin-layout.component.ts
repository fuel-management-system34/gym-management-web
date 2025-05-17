import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../../theme/shared/components/breadcrumb/breadcrumb.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { QuickPanelComponent } from './quick-panel/quick-panel.component';
import { MatCard } from '@angular/material/card';
import { MobileNavBarComponent } from './mobile-nav-bar/mobile-nav-bar.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    NavBarComponent,
    SidebarComponent,
    BreadcrumbComponent,
    RouterOutlet,
    QuickPanelComponent,
    MatCard,
    MobileNavBarComponent
  ],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminComponent implements OnInit {
  hideNavBar: boolean = false;
  mobileNavHeight: number = 0;
  @ViewChild('mobileNav') mobileNavRef: ElementRef<HTMLDivElement> | undefined;

  ngOnInit(): void {
    this.checkScreenWidth();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenWidth();
  }

  private checkScreenWidth(): void {
    if (window.innerWidth < 1000) {
      this.hideNavBar = true;
    } else {
      this.hideNavBar = false;
    }
    this.mobileNavHeight = 60 + this.getMobileNavHeight();
    //console.log(this.mobileNavHeight);
  }

  getMobileNavHeight(): number {
    return this.mobileNavRef?.nativeElement?.offsetHeight || 0;
  }
}
