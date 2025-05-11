import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from '../../../../theme/shared/shared.module';
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
import { TokenService } from '../../../../Core/services/token.service';
import { User } from '../../../../Core/models/User';
import { AuthService } from '../../../../Core/services/auth.service';
import { NotificationService } from '../../../../Services/notification-util.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { QuickPanelService } from '../../../../Core/services/quick-panel.service';

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
    private notificationUtilService: NotificationService,
    private tokenService: TokenService,
    private authService: AuthService,
    private quickPanelService: QuickPanelService
  ) {
    this.registerIcons();
  }

  ngOnInit(): void {
    this.getUserDataWithRetry(3);
  }

  getUserDataWithRetry(retries: number): void {
    let attempts = 0;
    const interval = setInterval(() => {
      const userData = this.tokenService.getUserData();
      attempts++;

      if (userData) {
        this.activeUserData = JSON.parse(userData);
        clearInterval(interval);
      } else if (attempts >= retries) {
        clearInterval(interval);
        console.warn('Failed to retrieve user data after retries.');
      }
    }, 1000); // Retry every 1 second
  }

  logOut(): void {
    this.authService
      .logout()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.notificationUtilService.success('Logged out successfully');
        },
        error: (err) => {
          console.error('Logout failed:', err);
          this.notificationUtilService.error('Logout failed');
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

  onNotificationClick() {
    this.quickPanelService.toggle();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
