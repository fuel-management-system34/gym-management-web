// angular import
import { Component, OnInit } from '@angular/core';
import { AuthService } from './Core/services/auth.service';
import { Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // public props
  title = 'Paradise project';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.router.url !== '/login') {
      // Listen for auth state changes
      this.authService.isAuthenticated
        .pipe(
          take(2) // Take initial value and first change
        )
        .subscribe((isAuthenticated) => {
          console.log('App detected auth state change:', isAuthenticated);

          // If authentication state becomes true and not already on login page
          if (isAuthenticated && this.router.url === '/login') {
            console.log('Redirecting to dashboard from login page');
            this.router.navigate(['/dashboard/default']);
          }
        });
    }
  }
}
