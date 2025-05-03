import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatGridListModule, MatChipsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  metrics = [
    { icon: 'groups', label: 'Active Members', value: 324 },
    { icon: 'sports_gymnastics', label: 'Total Trainers', value: 12 },
    { icon: 'payments', label: 'Monthly Income', value: '₹84,500' },
    { icon: 'event', label: 'Upcoming Classes', value: 7 }
  ];

  recentActivities = [
    { user: 'Amit R.', activity: 'Checked in', time: '2 mins ago' },
    { user: 'Sara P.', activity: 'Paid monthly fee', time: '10 mins ago' },
    { user: 'James K.', activity: 'Booked yoga class', time: '30 mins ago' }
  ];
}
