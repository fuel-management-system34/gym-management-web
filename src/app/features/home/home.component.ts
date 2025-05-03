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
    { icon: 'groups', value: 128, label: 'Active Members' },
    { icon: 'person_add', value: 12, label: 'New This Week' },
    { icon: 'fitness_center', value: 9, label: 'Available Trainers' },
    { icon: 'payments', value: '₹ 54,000', label: 'Monthly Revenue' },
    { icon: 'event', value: 6, label: "Today's Sessions" },
    { icon: 'schedule', value: 4, label: 'Renewals This Week' }
  ];

  recentActivities = [
    { user: 'John D.', activity: ' booked a PT session.', time: '2 mins ago' },
    { user: 'Priya R.', activity: ' renewed her membership.', time: '15 mins ago' },
    { user: 'Trainer Raj', activity: ' completed 3 sessions today.', time: '1 hour ago' },
    { user: 'Admin', activity: ' added new yoga class.', time: '3 hours ago' }
  ];
}
