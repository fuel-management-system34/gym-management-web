import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatChip } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-trainers-edit',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCard,
    MatChip
  ],
  templateUrl: './trainers-edit.component.html',
  styleUrl: './trainers-edit.component.scss'
})
export class TrainersEditComponent implements OnInit {
  memberId: string;
  trainer = {
    name: 'John Doe',
    role: 'Trainer',
    experience: 5,
    email: 'john@example.com',
    phone: '+1234567890',
    status: 'Active',
    profileImage: '' // Optional: URL string
  };
  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.memberId = this.route.snapshot.paramMap.get('id')!;
  }

  goBack(): void {
    this.location.back();
  }

  enableEdit(): void {
    //need to implement
  }
}
