import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './Layout/admin-layout/admin-layout.component';
import { AuthGuard } from './Core/guards/auth.guard';
import { MembersComponent } from './features/members/members.component';
import { MembersEditComponent } from './features/members/members-edit/members-edit.component';
import { TrainersComponent } from './features/trainers/trainers.component';
import { TrainersEditComponent } from './features/trainers/trainers-edit/trainers-edit.component';
import { ReportsComponent } from './features/reports/reports.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    //canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadComponent: () => import('./features/home/home.component').then((c) => c.HomeComponent)
      },
      {
        path: 'store',
        loadComponent: () => import('./features/store/store.component').then((c) => c.StoreComponent)
      },
      {
        path: 'site-settings',
        loadComponent: () => import('./features/site-settings/site-list/site-list.component').then((c) => c.SiteListComponent),
        children: [
          { path: '', redirectTo: 'users', pathMatch: 'full' },
          {
            path: 'users',
            loadComponent: () => import('./features/user-management/user-list/user-list.component').then((c) => c.UserListComponent)
          },
          {
            path: 'sites',
            loadComponent: () => import('./features/user-management/user-list/user-list.component').then((c) => c.UserListComponent)
          }
        ]
      },
      {
        path: 'appointments',
        loadComponent: () => import('./features/appointments/calender/calender.component').then((c) => c.CalenderComponent)
      },
      {
        path: 'workout-plans',
        loadComponent: () =>
          import('./features/workout plans/workout-plans-dashboard/workout-plans-dashboard.component').then(
            (c) => c.WorkoutPlansDashboardComponent
          )
      },
      {
        path: 'members',
        component: MembersComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadComponent: () => import('./features/members/members-list/members-list.component').then((c) => c.MembersListComponent)
          },
          {
            path: 'new',
            loadComponent: () => import('./features/members/members-add/members-add.component').then((c) => c.MembersAddComponent)
          },
          {
            path: 'edit/:id',
            component: MembersEditComponent,
            children: [
              { path: '', redirectTo: 'profile', pathMatch: 'full' },
              {
                path: 'profile',
                loadComponent: () =>
                  import('./features/members/members-edit/profile-info/profile-info.component').then((c) => c.ProfileInfoComponent),
                children: [
                  { path: '', redirectTo: 'demographics', pathMatch: 'full' },
                  {
                    path: 'demographics',
                    loadComponent: () =>
                      import('./features/members/members-edit/profile-info/demographics/demographics.component').then(
                        (c) => c.DemographicsComponent
                      )
                  },
                  {
                    path: 'contact-info',
                    loadComponent: () =>
                      import('./features/members/members-edit/profile-info/contact-info/contact-info.component').then(
                        (c) => c.ContactInfoComponent
                      )
                  },
                  {
                    path: 'emergency-contact',
                    loadComponent: () =>
                      import('./features/members/members-edit/profile-info/emergency-contact/emergency-contact.component').then(
                        (c) => c.EmergencyContactComponent
                      )
                  },
                  {
                    path: 'health-goals',
                    loadComponent: () =>
                      import('./features/members/members-edit/profile-info/health-goals/health-goals.component').then(
                        (c) => c.HealthGoalsComponent
                      )
                  }
                ]
              },
              {
                path: 'membership',
                loadComponent: () =>
                  import('./features/members/members-edit/membership/membership.component').then((c) => c.MembershipComponent)
              },
              {
                path: 'attendance',
                loadComponent: () =>
                  import('./features/members/members-edit/attendance/attendance.component').then((c) => c.AttendanceComponent)
              },
              {
                path: 'billing',
                loadComponent: () => import('./features/members/members-edit/billing/billing.component').then((c) => c.BillingComponent)
              }
            ]
          }
        ]
      },
      {
        path: 'trainers',
        component: TrainersComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadComponent: () => import('./features/trainers/trainers-list/trainers-list.component').then((c) => c.TrainersListComponent)
          },
          {
            path: 'new',
            loadComponent: () => import('./features/trainers/trainers-add/trainers-add.component').then((c) => c.TrainersAddComponent)
          },
          {
            path: 'edit/:id',
            component: TrainersEditComponent,
            children: [
              { path: '', redirectTo: 'profile', pathMatch: 'full' },
              {
                path: 'profile',
                loadComponent: () =>
                  import('./features/trainers/trainers-edit/profile-info/profile-info.component').then((c) => c.ProfileInfoComponent)
              },
              {
                path: 'attendance',
                loadComponent: () =>
                  import('./features/trainers/trainers-edit/attendance/attendance.component').then((c) => c.AttendanceComponent)
              },
              {
                path: 'financial',
                loadComponent: () =>
                  import('./features/trainers/trainers-edit/financial/financial.component').then((c) => c.FinancialComponent)
              }
            ]
          }
        ]
      },
      {
        path: 'reports',
        component: ReportsComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadComponent: () =>
              import('./features/reports/member-attendance/member-attendance.component').then((c) => c.MemberAttendanceComponent)
          },
          {
            path: 'attendance',
            loadComponent: () =>
              import('./features/reports/member-attendance/member-attendance.component').then((c) => c.MemberAttendanceComponent)
          },
          {
            path: 'payments',
            loadComponent: () =>
              import('./features/reports/payment-summary/payment-summary.component').then((c) => c.PaymentSummaryComponent)
          },
          {
            path: 'sales',
            loadComponent: () => import('./features/reports/sales/sales.component').then((c) => c.SalesComponent)
          },
          {
            path: 'trainerPerformance',
            loadComponent: () =>
              import('./features/reports/trainer-performance/trainer-performance.component').then((c) => c.TrainerPerformanceComponent)
          },
          {
            path: 'classEnrollment',
            loadComponent: () =>
              import('./features/reports/class-enrollment/class-enrollment.component').then((c) => c.ClassEnrollmentComponent)
          }
        ]
      }
    ]
  },
  {
    path: '*',
    loadComponent: () => import('./Layout/admin-layout/admin-layout.component').then((c) => c.AdminComponent)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
