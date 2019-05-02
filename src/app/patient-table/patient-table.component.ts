import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-patient-table',
  templateUrl: './patient-table.component.html',
  styleUrls: ['./patient-table.component.css']
})
export class PatientTableComponent implements OnInit {

  constructor(private http:HttpClient) { }
  Patient;
  ngOnInit() {
    this.http.get('https://digitalapp001.herokuapp.com/api/pat/getall').subscribe(this.cb)
  }
  cb=(dt)=>{
    this.Patient=dt;
    console.log(this.Patient)
  }

}
