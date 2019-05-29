import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(@Inject(HttpClient) private http) {
    this.getTotalPatients();
   }
   patient;
  ngOnInit() {
  }
  deleteDB(){
    this.http.get('https://digitalapp001.herokuapp.com/api/pat/deleteAllDB').subscribe(this.cb)
  }
  cb=(dt)=>{
    console.log(dt)
  }
  getTotalPatients(){
    this.http.get('https://digitalapp001.herokuapp.com/api/pat/getPatientCount').subscribe(this.cb21)
  }
  cb21=(dt)=>{
    console.log(dt);
    this.patient=dt.pat;
    
  }
}
