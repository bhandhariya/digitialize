import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxLoadingModule } from 'ngx-loading';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './services/login.service';
import { ConfigService } from './shared/config.service';
import { AuthGurad } from './shared/routeGuards/auth.guard';
import { RegisterComponent } from './register/register.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpErrorInterceptor } from './services/httpErrorInterceptor';
import { RegisterService } from './services/register.service';
import { ForgotService } from './services/forgot.service';
import { ChangepasswordService } from './services/changepassword.service';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { LoginGuard } from './shared/routeGuards/login.guard';
import { Form5FirstComponent } from './form5-first/form5-first.component';

const routes: Routes = [
  { path : 'login', component : LoginComponent, canActivate :[LoginGuard] },
  { path : 'register', component : RegisterComponent, canActivate :[LoginGuard] },
  { path : 'forgot', component : ForgotpasswordComponent, canActivate :[LoginGuard] },
  { path : 'changepassword/:id', component : ChangepasswordComponent, canActivate :[LoginGuard]  },
  { path : 'dashboard', loadChildren : './dashboard/dashboard.module#DashboardModule', canActivate : [AuthGurad]},
  { path : '**', component : LoginComponent, canActivate :[LoginGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotpasswordComponent,
    ChangepasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgxLoadingModule.forRoot({})
  ],
  exports: [
    BrowserModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgxLoadingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    ConfigService,
    LoginService,
    RegisterService,
    ForgotService,
    ChangepasswordService,
    AuthGurad,
    LoginGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
