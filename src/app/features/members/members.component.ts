import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-members-list',
  standalone: true,
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
  imports: [RouterOutlet]
})
export class MembersComponent {}
