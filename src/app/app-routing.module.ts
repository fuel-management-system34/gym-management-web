import { UserListComponent } from './features/user-management/user-list/user-list.component';
// angular import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Project import
import { GuestComponent } from './Layout/guest/guest.component';
import { AdminComponent } from './Layout/admin-layout/admin-layout.component';
import { AuthGuard } from './Core/guards/auth.guard';
import { MembersListComponent } from './features/members/members-list/members-list.component';
import { MembersComponent } from './features/members/members.component';

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
            path: 'edit/:id', // Path for editing an existing member
            loadComponent: () => import('./features/members/members-edit/members-edit.component').then((c) => c.MembersEditComponent)
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
