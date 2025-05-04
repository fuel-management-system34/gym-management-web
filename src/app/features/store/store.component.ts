import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatGridListModule, MatButtonModule, MatIconModule, MatToolbarModule],
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  storeInsights: any[] = [
    { title: 'Total Sales', value: '$12,450', icon: 'attach_money' },
    { title: 'Total Customers', value: '345', icon: 'person' },
    { title: 'Active Products', value: '48', icon: 'shopping_cart' },
    { title: 'Pending Orders', value: '12', icon: 'hourglass_empty' }
  ];

  categories: any[] = [
    { name: 'Gym Equipments', imgSrc: 'assets/images/gym-equipment.png' },
    { name: 'Nutrition & Supplements', imgSrc: 'assets/images/supplements.png' },
    { name: 'Apparel', imgSrc: 'assets/images/apparel.jpg' },
    { name: 'Accessories', imgSrc: 'assets/images/accessories.jpg' }
  ];

  constructor(
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {}

  goBack(): void {
    this.location.back();
  }

  addNew(): void {
    this.router.navigate(['/new']);
  }
}
