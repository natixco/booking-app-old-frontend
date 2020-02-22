import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { DashboardComponent } from './components/pages/app/dashboard/dashboard.component';
import { LoginComponent } from './components/pages/auth/login/login.component';
import { SignupComponent } from './components/pages/auth/signup/signup.component';
import { TableCreateComponent } from './components/pages/app/tables/table-create/table-create.component';
import { ScheduleComponent } from './components/pages/app/schedule/schedule.component';
import { SettingsComponent } from './components/pages/app/settings/settings/settings.component';
import { TablesComponent } from './components/pages/app/tables/tables/tables.component';
import { TableComponent } from './components/pages/app/tables/table/table.component';
import { AccountComponent } from './components/pages/app/settings/account/account.component';
import { HelpComponent } from './components/pages/help/help.component';
import { CompanyComponent } from './components/pages/app/settings/company/company.component';
import { ServiceEditComponent } from './components/pages/app/tables/service-edit/service-edit.component';
import { Error404Component } from './components/pages/error404/error404.component';
import { ServiceCreateComponent } from './components/pages/app/tables/service-create/service-create.component';
import { TableEditComponent } from './components/pages/app/tables/table-edit/table-edit.component';
import { ForgotPasswordComponent } from './components/pages/auth/forgot-password/forgot-password.component';
import { BookingComponent } from './components/pages/booking/booking.component';
import { ProfileComponent } from './components/pages/profile/profile.component';

import { UserGuard } from './guards/user.guard';
import { UserGuard2 } from './guards/user2.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: ':id',
    component: ProfileComponent
  },
  {
    path: 'help',
    component: HelpComponent
  },
  {
    path: 'booking/:id',
    component: BookingComponent
  },
  {
    path: 'app',
    canActivate: [UserGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'schedule',
        component: ScheduleComponent,
      },
      {
        path: 'tables',
        children: [
          {
            path: '',
            component: TablesComponent
          },
          {
            path: 'createTable',
            component: TableCreateComponent
          },
          {
            path: ':id',
            children: [
              {
                path: '',
                component: TableComponent
              },
              {
                path: 'createService',
                component: ServiceCreateComponent
              },
              {
                path: 'editTable',
                component: TableEditComponent
              },
              {
                path: ':id2',
                component: ServiceEditComponent
              },
            ]
          }
        ]
      },
      {
        path: 'settings',
        children: [
          {
            path: '',
            component: SettingsComponent
          },
          {
            path: 'account',
            component: AccountComponent
          },
          {
            path: 'company',
            component: CompanyComponent
          }
        ]
      }
    ]
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [UserGuard2]
      },
      {
        path: 'signup',
        component: SignupComponent,
        canActivate: [UserGuard2]
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent
      },
      {
        path: 'logged-out',
        component: LoginComponent
      }
    ]
  },
  {
    path: '404',
    component: Error404Component
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
