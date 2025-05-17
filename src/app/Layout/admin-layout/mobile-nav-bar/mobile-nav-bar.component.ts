import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MenuItems } from '../../../Models/menu-items.type'; // adjust path if needed

@Component({
  selector: 'app-mobile-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatIconModule, MatButtonModule, MatListModule, MatSidenavModule],
  templateUrl: './mobile-nav-bar.component.html',
  styleUrl: './mobile-nav-bar.component.scss'
})
export class MobileNavBarComponent {
  menuItems = MenuItems;

  toggleDrawer(drawer: any) {
    drawer.toggle();
  }
}
