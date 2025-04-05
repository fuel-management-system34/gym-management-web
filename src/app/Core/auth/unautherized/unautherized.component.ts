import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unautherized',
  templateUrl: './unautherized.component.html',
  styleUrls: ['./unautherized.component.css'],
  standalone: true,
  imports: [MatCardModule, MatIconModule]
})
export class UnautherizedComponent {
  constructor(private router: Router) {}

  goBack(): void {
    this.router.navigate(['/']);
  }
}
