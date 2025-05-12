import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-members-list',
  standalone: true,
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
  imports: [RouterOutlet, MatCardModule]
})
export class MembersComponent {}
