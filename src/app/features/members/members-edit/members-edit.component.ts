import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-members-edit',
  standalone: true,
  imports: [],
  templateUrl: './members-edit.component.html',
  styleUrl: './members-edit.component.scss'
})
export class MembersEditComponent implements OnInit {
  memberId: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.memberId = this.route.snapshot.paramMap.get('id')!;
  }
}
