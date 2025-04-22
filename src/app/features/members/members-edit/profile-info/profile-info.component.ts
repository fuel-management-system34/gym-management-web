import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile-info',
  standalone: true,
  imports: [CommonModule, RouterModule, MatTabsModule, MatToolbarModule, MatIconModule],
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.scss'
})
export class ProfileInfoComponent {
  ActiveTab: string = 'Demographics';
  constructor(private router: Router) {}

  onTabChange(index: number) {
    const tabRoutes = ['demographics', 'contact-info', 'emergency-contact', 'health-goals'];
    switch (index) {
      case 0:
        this.ActiveTab = 'Demographics';
        break;
      case 1:
        this.ActiveTab = 'Contact-Info';
        break;
      case 2:
        this.ActiveTab = 'Emergency-Contact';
        break;
      case 3:
        this.ActiveTab = 'Health-Goals';
        break;
    }
    this.router.navigate([tabRoutes[index]], { relativeTo: this.router.routerState.root.firstChild?.firstChild?.firstChild?.firstChild });
  }

  save(): void {
    //need to implement
  }
}
