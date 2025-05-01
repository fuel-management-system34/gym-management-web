import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Project import
import { GuestComponent } from './Layout/guest/guest.component';
import { AdminComponent } from './Layout/admin-layout/admin-layout.component';
import { AuthGuard } from './Core/guards/auth.guard';
import { MembersComponent } from './features/members/members.component';
import { MembersEditComponent } from './features/members/members-edit/members-edit.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    //canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/dashboard/default',
        pathMatch: 'full'
      },
      {
        path: 'dashboard/default',
        loadComponent: () => import('./demo/default/dashboard/dashboard.component').then((c) => c.DefaultComponent)
      },
      {
        path: 'users',
        loadComponent: () => import('./features/user-management/user-list/user-list.component').then((c) => c.UserListComponent)
      },
      {
        path: 'site-settings',
        loadComponent: () => import('./features/site-settings/site-list/site-list.component').then((c) => c.SiteListComponent)
      },
      {
        path: 'appointments',
        loadComponent: () => import('./features/appointments/calender/calender.component').then((c) => c.CalenderComponent)
      },
      {
        path: 'color',
        loadComponent: () => import('./demo/ui-component/ui-color/ui-color.component')
      },
      {
        path: 'members',
        component: MembersComponent,
        children: [
          {
            path: '', // Default route for the member list
            pathMatch: 'full',
            loadComponent: () => import('./features/members/members-list/members-list.component').then((c) => c.MembersListComponent)
          },
          {
            path: 'new', // Path for adding a new member
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
      }
    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./Core/auth/login/login.component').then((c) => c.LoginComponent)
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking' // Wait for initialization before navigation
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
