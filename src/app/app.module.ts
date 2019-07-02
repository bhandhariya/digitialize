import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxLoadingModule } from 'ngx-loading';

 import { AngularFireModule } from "@angular/fire";
 import { AngularFireStorageModule } from "@angular/fire/storage";
 import { AngularFireAuthModule } from "@angular/fire/auth";
 import { AngularFireDatabaseModule } from "@angular/fire/database";
 
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { UserService } from './services/user.service';
import { MyFireService } from './services/my-fire.service';
import { PatientComponent} from './patient/patient.component';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';




const routes: Routes = [
  { path : 'login', component : LoginComponent, canActivate :[LoginGuard] },
  { path : 'register', component : RegisterComponent, canActivate :[LoginGuard] },
  { path : 'forgot', component : ForgotpasswordComponent, canActivate :[LoginGuard] },
  { path : 'patient', component : PatientComponent, canActivate :[LoginGuard] },
  { path : 'changepassword/:id', component : ChangepasswordComponent, canActivate :[LoginGuard]  },
  { path : 'dashboard', loadChildren : './dashboard/dashboard.module#DashboardModule', canActivate :[LoginGuard]},
  { path : '**', component : LoginComponent, canActivate :[LoginGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotpasswordComponent,
    ChangepasswordComponent,
    PatientComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp({
      
        apiKey: "AIzaSyD0odymXr_m3OPJNtHYFH2cHeftpmfZu4U",
        authDomain: "digitalapp-49c9e.firebaseapp.com",
        databaseURL: "https://digitalapp-49c9e.firebaseio.com",
        projectId: "digitalapp-49c9e",
        storageBucket: "digitalapp-49c9e.appspot.com",
        messagingSenderId: "937297135346"
      
    }),
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    RouterModule.forRoot(routes),
    NgxLoadingModule.forRoot({}),
    BrowserAnimationsModule,
    MatExpansionModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatTableModule,MatDialogModule
   
  ],
  exports: [
    BrowserModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgxLoadingModule,
    MatExpansionModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    ConfigService,
    LoginService,
    RegisterService,
    ForgotService,
    ChangepasswordService,
    AuthGurad,
    LoginGuard,
    MyFireService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
