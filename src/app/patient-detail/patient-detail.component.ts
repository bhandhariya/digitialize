import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import * as saveAs from "file-saver";
import { jsonexport } from "jsonexport/dist";


@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css']
})
export class  PatientDetailComponent implements OnInit {

  constructor(private http:HttpClient,private aroute:ActivatedRoute,private router:Router) { }
  Patient;id;
  url="https://digitalapp001.herokuapp.com"
  ngOnInit() {

    this.aroute.paramMap.subscribe(e=>{
      this.id=e.get('id');
      console.log(this.id)
    })
    this.getAllData();
  }
  getAllData(){
    var obj={
      id:this.id
    }
    
    this.http.post('https://digitalapp001.herokuapp.com/api/pat/alldata',obj).subscribe(this.cb)
  }
  cb=(dt)=>{
    this.Patient=dt;
    console.log(this.Patient)
  }
  fillPsychatricDetails(){
    this.router.navigate(['dashboard/accordian',{id:this.id}])
  }
  downloadExcel(){
    console.log(this.Patient)
    jsonexport(this.Patient,function(err, csv){
      if(err) return console.log(err);
      saveAs(new Blob([csv],{type:'text/json'}),'datdaata.csv')
  });
  }

}
