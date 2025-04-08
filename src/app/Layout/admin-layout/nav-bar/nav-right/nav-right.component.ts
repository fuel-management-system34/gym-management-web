import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { IconService } from '@ant-design/icons-angular';
import {
  BellOutline,
  SettingOutline,
  GiftOutline,
  MessageOutline,
  PhoneOutline,
  CheckCircleOutline,
  LogoutOutline,
  EditOutline,
  UserOutline,
  ProfileOutline,
  WalletOutline,
  QuestionCircleOutline,
  LockOutline,
  CommentOutline,
  UnorderedListOutline,
  ArrowRightOutline,
  GithubOutline
} from '@ant-design/icons-angular/icons';
import { TokenService } from 'src/app/Core/services/token.service';
import { User } from 'src/app/Core/models/User';
import { AuthService } from 'src/app/Core/services/auth.service';
import { NotificationUtilService } from '../../../../Services/notification-util.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-nav-right',
  standalone: true,
  imports: [SharedModule, RouterModule],
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent implements OnInit, OnDestroy {
  @Input() styleSelectorToggle!: boolean;
  @Output() Customize = new EventEmitter();

  windowWidth: number = window.innerWidth;
  screenFull: boolean = true;
  loggedUserData: any;
  activeUserData!: User;

  private destroy$ = new Subject<void>();

  profile = [{ icon: 'edit', title: 'Edit Profile' }];
  setting = [
    { icon: 'question-circle', title: 'Support' },
    { icon: 'user', title: 'Account Settings' },
    { icon: 'lock', title: 'Privacy Center' },
    { icon: 'comment', title: 'Feedback' },
    { icon: 'unordered-list', title: 'History' }
  ];

  constructor(
    private iconService: IconService,
    private router: Router,
    private notificationUtilService: NotificationUtilService,
    private tokenService: TokenService,
    private authService: AuthService
  ) {
    this.registerIcons();
  }

  ngOnInit(): void {
    try {
      const userData = this.tokenService.getUserData();
      this.activeUserData = JSON.parse(userData);
    } catch (e) {
      console.error('Invalid user data in tokenService:', e);
      this.activeUserData = {} as User;
    }
  }

  logOut(): void {
    this.authService
      .logout()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.notificationUtilService.showSuccess('Logged out successfully');
        },
        error: (err) => {
          console.error('Logout failed:', err);
          this.notificationUtilService.showError('Logout failed');
        }
      });
  }

  private registerIcons(): void {
    const icons = [
      CheckCircleOutline,
      GiftOutline,
      MessageOutline,
      SettingOutline,
      PhoneOutline,
      LogoutOutline,
      UserOutline,
      EditOutline,
      ProfileOutline,
      QuestionCircleOutline,
      LockOutline,
      CommentOutline,
      UnorderedListOutline,
      ArrowRightOutline,
      BellOutline,
      GithubOutline,
      WalletOutline
    ];
    this.iconService.addIcon(...icons);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
