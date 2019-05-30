import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-table',
  templateUrl: './patient-table.component.html',
  styleUrls: ['./patient-table.component.css']
})
export class PatientTableComponent implements OnInit {
url="https://digitalapp001.herokuapp.com";
  constructor(private http:HttpClient,private router:Router) { }
  Patient;
  ngOnInit() {
    this.http.get('https://digitalapp001.herokuapp.com/api/pat/getall').subscribe(this.cb)
  }
  cb=(dt)=>{
    this.Patient=dt;
    console.log(this.Patient)
  }
  goToForm5(x){
    console.log(x)
    this.router.navigate(['dashboard/patable/details',{id:x}])

  }
  gotosecondpage(x){
    this.router.navigate(['dashboard/second',{id:x}])
  }

}
