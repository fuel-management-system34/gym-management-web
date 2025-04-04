// angular import
import { Component, OnInit } from '@angular/core';
import { AuthService } from './Services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // public props
  title = 'Paradise project';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.checkAuthenticationOnInit();
  }
}
