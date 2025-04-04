// angular import
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { NotificationUtilService } from 'src/app/Services/notification-util.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export default class LoginComponent {
  private googleClientID: string = '92676718844-f0i9su48i89gjfiod5l62nuh352atjmj.apps.googleusercontent.com';

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationUtilService: NotificationUtilService
  ) {}

  // onLogin() {
  //   this.authService.login().subscribe(
  //     (response) => {
  //       console.log(response);
  //       this.router.navigate(['/dashboard/default']);
  //     },
  //     (error) => {
  //       console.error('Login failed', error);
  //     }
  //   );
  // }

  onGoogleLogin() {
    window['google'].accounts.id.initialize({
      client_id: this.googleClientID,
      callback: this.handleCredentialResponse.bind(this)
    });
    window['google'].accounts.id.prompt();
  }

  handleCredentialResponse(response: any) {
    const idToken = response.credential;
    const userData = this.decodeJwt(idToken);

    const expiryTime = userData.exp * 1000;
    localStorage.setItem('token', idToken);
    localStorage.setItem('tokenExpiry', expiryTime.toString());
    localStorage.setItem('loggedUserData', JSON.stringify(userData));
    this.authService.setAuthenticationStatus(true);
    this.router.navigate(['/dashboard/default']);
    this.notificationUtilService.showSuccess('Login successful!');

    const authRequest = {
      Token: idToken,
      email: userData.email,
      name: userData.name
    };

    // need to implement
    // this.authService.login(authRequest).subscribe(
    //   (response) => {
    //     console.log(response);
    //     this.router.navigate(['/dashboard/default']);
    //   },
    //   (error) => {
    //     // Handle error
    //     console.error('Google login failed', error);
    //   }
    // );
  }

  decodeJwt(token: string) {
    const payload = token.split('.')[1];
    return JSON.parse(window.atob(payload));
  }
}
