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

    // Components
import { FooterComponent } from '../shared/footer/footer.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { TopnavbarComponent } from '../shared/topnavbar/topnavbar.component';
import { DashboardComponent } from './dashboard.component';
import { FirstComponent } from '../first/first.component';
import { HttpErrorInterceptor } from '../services/httpErrorInterceptor';
import { SecondComponent } from '../second/second.component';
import { Form5FirstComponent } from '../form5-first/form5-first.component';
import { FamilydataComponent } from '../familydata/familydata.component';
import { ChildrenComponent } from '../children/children.component';
import { PatientTableComponent } from "../patient-table/patient-table.component";
import { ChiefComplainComponent } from '../chief-complain/chief-complain.component';
import { IllnessComponent } from '../illness/illness.component';
import { HistoryComponent } from '../history/history.component';
import { AccordianDemoComponent } from '../accordian-demo/accordian-demo.component';
import { DemoDashComponent } from '../demo-dash/demo-dash.component';

const AppRoutes: Routes = [
  { path : '', component : DashboardComponent },
  { path : 'first', component : FirstComponent },
  { path : 'second', component : SecondComponent },
  { path : 'form1', component : Form5FirstComponent },
  { path : 'family', component : FamilydataComponent },
  { path : 'children', component : ChildrenComponent },
  { path : 'patable', component : PatientTableComponent },
  { path : 'chiefComplain', component : ChiefComplainComponent },
  { path : 'illness', component : IllnessComponent },
  { path : 'history', component : HistoryComponent },
  { path : 'accordian', component : AccordianDemoComponent },
  { path : 'demo', component : DemoDashComponent },
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
    Form5FirstComponent,
    FamilydataComponent,
    ChildrenComponent,
    PatientTableComponent,
    ChiefComplainComponent,
    IllnessComponent,
    HistoryComponent,
    AccordianDemoComponent,
    DemoDashComponent
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
  ],
  providers :[
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  ]
})
export class DashboardModule { }
