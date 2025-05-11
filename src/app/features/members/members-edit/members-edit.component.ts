import { CommonModule, Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MemberApiService } from 'src/app/Services/api/member-api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-members-edit',
  standalone: true,
  imports: [CommonModule, RouterModule, MatSidenavModule, MatListModule, MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './members-edit.component.html',
  styleUrl: './members-edit.component.scss'
})
export class MembersEditComponent implements OnInit, OnDestroy {
  memberId: number;
  member: any;
  private subscriptions = new Subscription();
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private memberService: MemberApiService,
    
  ) {}

  ngOnInit(): void {
    this.memberId = +this.route.snapshot.paramMap.get('id');
    this.getMemberDetails();
  }

  goBack(): void {
    this.location.back();
  }

  enableEdit(): void {
    //need to implement
  }

  getMemberDetails():void{
     this.subscriptions.add(this.memberService.fetchById(this.memberId).subscribe({
          next: (data) => {
             this.member = data;          
          },
          error: (err) => {
            console.error('Failed to load members:', err);            
          }
        })
      );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
