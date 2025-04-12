import { Component, NgZone, OnInit } from '@angular/core';
declare const google: any;
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatCommonModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { NotificationService } from 'src/app/Services/notification-util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    MatCommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    CommonModule,
    FormsModule
  ]
})
export class LoginComponent implements OnInit {
  loading = false;
  returnUrl: string;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private ngZone: NgZone,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    // Get return URL from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    // Initialize Google Sign-In
    this.initializeGoogleSignIn();
  }

  initializeGoogleSignIn(): void {
    // Wait for Google API to load
    window.onload = () => {
      google.accounts.id.initialize({
        client_id: '92676718844-f0i9su48i89gjfiod5l62nuh352atjmj.apps.googleusercontent.com', // Replace with your actual Google Client ID
        callback: this.handleGoogleCredentialResponse.bind(this),
        auto_select: false,
        cancel_on_tap_outside: true
      });

      google.accounts.id.renderButton(document.getElementById('googleSignIn'), {
        theme: 'outline',
        size: 'large',
        width: 240,
        logo_alignment: 'center'
      });

      // Also display the One Tap dialog
      google.accounts.id.prompt();
    };
  }

  handleGoogleCredentialResponse(response: any): void {
    // Google Sign-In response handling
    this.loading = true;

    // Get the ID token from the response
    const token = response.credential;

    // Decode the token to get user information
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    const { email } = JSON.parse(jsonPayload);

    // Call the server to authenticate with Google
    this.authService.googleLogin({ email, googleToken: token }).subscribe(
      (result) => {
        this.ngZone.run(() => {
          this.loading = false;
          this.router.navigate([this.returnUrl]);
          setTimeout(
            () => {
              this.authService.startTokenExpirationTimer();
            },
            55 * 60 * 1000
          ); // 55 minutes
        });
      },
      (error) => {
        this.ngZone.run(() => {
          this.loading = false;
          // If the error is 401 Unauthorized, it means the user is not registered in the system
          if (error.status === 401) {
            this.error = 'You are not authorized to access this system. Please contact your administrator.';
            this.notificationService.error(`Access Denied`);
          } else {
            this.notificationService.error(`Authentication failed. Please try again.`);
          }
        });
      }
    );
  }
}
