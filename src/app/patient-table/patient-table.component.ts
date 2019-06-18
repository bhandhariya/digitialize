import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as jsonexport from "jsonexport/dist"
import * as saveAs from "file-saver";
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

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
  excel(id){
    
    var obj={
      id:id
    }
    
    this.http.post('https://digitalapp001.herokuapp.com/api/pat/alldata',obj).subscribe(this.excelcb)
  }
excelcb=(dt)=>{
  console.log(dt);
  jsonexport(dt,{verticalOutput:false},function(err, csv){
    if(err) return console.log(err);
    saveAs(new Blob([csv],{type:'text/json'}),'datdaata.csv')
    console.log(csv)
});
}
pdf(id){
  var obj={
    id:id
  }
  
  this.http.get('https://jsonplaceholder.typicode.com/todos').subscribe(this.pdfcb)
}
dtt;
pdfcb=(dt)=>{
  console.log(dt)
  var doc = new jsPDF();
  
  doc.autoTable({
    head: [['userId', 'id', 'title','completed']],
    body: [
       [dt.userId,dt.id,dt.title,dt.completed]
    ]
});
doc.save('raja.pdf')

}
}
