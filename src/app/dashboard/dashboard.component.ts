import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as jsonexport from "jsonexport/dist"
import * as saveAs from "file-saver";
import Swal from 'sweetalert2'

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
  downloadALL(){
 
    this.http.get('https://digitalapp001.herokuapp.com/api/pat/getall').subscribe(this.excelcb)
  }
  excelcb=(dt)=>{
    console.log(dt);
    jsonexport(dt,{verticalOutput:false},function(err, csv){
      if(err) return console.log(err);
      saveAs(new Blob([csv],{type:'text/json'}),'datdaata.csv')
      console.log(csv)
  });
  }
  notautho(){
    Swal.fire({type: 'error',title: 'you have not permission to perform this task please contact Abhishek ',showConfirmButton: false,timer: 3000});
  }
}
