//------------------------------- DEFAULT NG MODULES ----------------------------------------------------
import { BrowserModule }                                    from '@angular/platform-browser';
import { NgModule }                                         from '@angular/core';
import { ReactiveFormsModule }                              from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS }  from '@angular/common/http';
import { ScrollingModule }                                  from '@angular/cdk/scrolling';
import { BrowserAnimationsModule }                          from '@angular/platform-browser/animations';
import { AppRoutingModule }                                 from './app-routing.module';

//------------------------------- MODULES ----------------------------------------------------
import { TranslateLoader, TranslateModule }                 from '@ngx-translate/core';
import { TranslateHttpLoader }                              from '@ngx-translate/http-loader';
import { RecaptchaModule }                                  from 'ng-recaptcha';

//------------------------------- SERVICES & GUARDS -----------------------------------------------
import { UserGuard }                from '@guards/user.guard';
import { UserGuard2 }               from '@guards/user2.guard';
import { AuthService }              from '@services/auth/auth.service';
import { TokenInterceptorService }  from '@services/token-interceptor/token-interceptor.service';
import { LanguageService }          from '@services/language/language.service';
import { CookieService}             from 'ngx-cookie-service';

//------------------------------- IMPORTED COMPS --------------------------------------------------
import { NavbarComponent }            from './components/imported/navbar/navbar.component';
import { SidebarComponent }           from './components/imported/sidebar/sidebar.component';
import { CalendarComponent }          from './components/imported/calendar/calendar.component';
import { NotificationPopupComponent } from './components/imported/notification-popup/notification-popup.component';

//------------------------------- ROUTE: / ----------------------------------------------------
import { AppComponent }         from './app.component';
import { HomeComponent }        from './components/pages/home/home.component';
import { HelpComponent }        from './components/pages/help/help.component';
import { Error404Component }    from './components/pages/error404/error404.component';
import { BookingComponent } from './components/pages/booking/booking.component';
import { ProfileComponent } from './components/pages/profile/profile.component';

//------------------------------- ROUTE: /app ----------------------------------------------------
import { DashboardComponent }         from './components/pages/app/dashboard/dashboard.component';
import { ScheduleComponent }          from './components/pages/app/schedule/schedule.component';
import { SettingsComponent }          from './components/pages/app/settings/settings/settings.component';
import { TablesComponent }            from './components/pages/app/tables/tables/tables.component';
import { TableComponent }             from './components/pages/app/tables/table/table.component';
import { ServiceEditComponent }       from './components/pages/app/tables/service-edit/service-edit.component';
import { TableCreateComponent }       from './components/pages/app/tables/table-create/table-create.component';
import { CompanyComponent }           from './components/pages/app/settings/company/company.component';
import { AccountComponent }           from './components/pages/app/settings/account/account.component';
import { ServiceCreateComponent }     from './components/pages/app/tables/service-create/service-create.component';
import { TableEditComponent }         from './components/pages/app/tables/table-edit/table-edit.component';

//------------------------------- ROUTE: /auth ----------------------------------------------------
import { LoginComponent }             from './components/pages/auth/login/login.component';
import { SignupComponent }            from './components/pages/auth/signup/signup.component';
import { ForgotPasswordComponent }    from './components/pages/auth/forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    TableCreateComponent,
    ScheduleComponent,
    SettingsComponent,
    TablesComponent,
    TableComponent,
    SidebarComponent,
    AccountComponent,
    HelpComponent,
    CompanyComponent,
    ServiceEditComponent,
    CalendarComponent,
    Error404Component,
    NotificationPopupComponent,
    ServiceCreateComponent,
    TableEditComponent,
    ForgotPasswordComponent,
    BookingComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ScrollingModule,
    RecaptchaModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    AuthService,
    UserGuard,
    UserGuard2,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}