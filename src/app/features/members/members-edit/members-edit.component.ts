import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-members-edit',
  standalone: true,
  imports: [CommonModule, RouterModule, MatSidenavModule, MatListModule, MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './members-edit.component.html',
  styleUrl: './members-edit.component.scss'
})
export class MembersEditComponent implements OnInit {
  memberId: string;
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
