    // Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxLoadingModule } from 'ngx-loading'; 

    // Components
import { FooterComponent } from '../shared/footer/footer.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { TopnavbarComponent } from '../shared/topnavbar/topnavbar.component';
import { DashboardComponent } from './dashboard.component';
import { FirstComponent } from '../first/first.component';
import { HttpErrorInterceptor } from '../services/httpErrorInterceptor';
import { SecondComponent } from '../second/second.component';

const AppRoutes: Routes = [
  { path : '', component : DashboardComponent },
  { path : 'first', component : FirstComponent },
  { path : 'second', component : SecondComponent },
  { path : '**', redirectTo :'', pathMatch : 'full'}
];


@NgModule({
  declarations: [
    FooterComponent,
    SidebarComponent,
    TopnavbarComponent,
    DashboardComponent,
    FirstComponent,
    SecondComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(AppRoutes),
    NgxLoadingModule.forRoot({}),
    BsDatepickerModule.forRoot(),
  ],
  providers :[
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  ]
})
export class DashboardModule { }
