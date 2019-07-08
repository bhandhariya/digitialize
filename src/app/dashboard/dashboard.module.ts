    // Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxLoadingModule } from 'ngx-loading'; 
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { NumberModule } from "../shared/number.module";

    // Components
import { FooterComponent } from '../shared/footer/footer.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { TopnavbarComponent } from '../shared/topnavbar/topnavbar.component';
import { DashboardComponent } from './dashboard.component';
import { FirstComponent } from '../first/first.component';
import { HttpErrorInterceptor } from '../services/httpErrorInterceptor';
import { SecondComponent } from '../second/second.component';
import { PatientTableComponent } from "../patient-table/patient-table.component";
import { AccordianDemoComponent } from '../accordian-demo/accordian-demo.component';
import { PatientDetailComponent } from '../patient-detail/patient-detail.component';



import {MatInputModule} from '@angular/material/input';
// import {MatDatepickerModule,} from '@angular/material/datepicker';
// import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatDialogModule} from '@angular/material/dialog';
import { ProfileComponent } from './profile/profile.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import {
  MatDatepickerModule,
  MatNativeDateModule,
  MAT_DATE_FORMATS,
  DateAdapter as DataAdapterFormMaterial
 } from '@angular/material';
 import { NativeDateAdapter } from "@angular/material";

 export class AppDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
      if (displayFormat === 'input') {
          const day = date.getDate();
          const month = date.getMonth() + 1;
          const year = date.getFullYear();
          return `${day}/${month}/${year}`;
      }
      return date.toDateString();
  }
}

export const APP_DATE_FORMATS =
{
  parse: {
      dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
    },
  display: {
      dateInput: 'input',
      monthYearLabel: { year: 'numeric', month: 'numeric' },
      dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
      monthYearA11yLabel: { year: 'numeric', month: 'long' },
  }
};


const AppRoutes: Routes = [
  { path : '', component : DashboardComponent },
  { path : 'first', component : FirstComponent },
  { path : 'second', component : SecondComponent },
  {path:'profile',component:ProfileComponent},

  { path : 'patable', component : PatientTableComponent },
  { path : 'details', component : PatientDetailComponent },

  { path : 'accordian', component : AccordianDemoComponent },
  { path : '**', redirectTo :'', pathMatch : 'full'}
];


@NgModule({
  declarations: [
    FooterComponent,
    SidebarComponent,
    TopnavbarComponent,
    DashboardComponent,
    FirstComponent,
    SecondComponent,
    PatientTableComponent,
    AccordianDemoComponent,
    PatientDetailComponent,
    ProfileComponent
    

  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(AppRoutes),
    NgxLoadingModule.forRoot({}),
    BsDatepickerModule.forRoot(),
    MatExpansionModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatRadioModule,MatDialogModule,NumberModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
  ],
  providers :[
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: DataAdapterFormMaterial, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
  ]
})
export class DashboardModule { }
