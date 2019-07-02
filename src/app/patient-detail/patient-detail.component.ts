import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import * as saveAs from "file-saver";
import { jsonexport } from "jsonexport/dist";
import Swal from 'sweetalert2';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { PatientComponent } from "../patient/patient.component";
import { PopupComponent } from "../popup/popup.component";
import { HistoryComponent } from "../history/history.component";

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css']
})
export class  PatientDetailComponent implements OnInit {

  constructor(private http:HttpClient,private aroute:ActivatedRoute,private router:Router,public dialog: MatDialog) { }
  Patient;id;
  url="https://digitalapp001.herokuapp.com"
  ngOnInit() {

    // this.aroute.paramMap.subscribe(e=>{
    //   this.id=e.get('id');
    //   console.log(this.id)
    // })
    this.getAllData();
  }
  getAllData(){
   
    this.http.get('https://digitalapp001.herokuapp.com/api/pat/getall').subscribe(this.cb)
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
  getThisPatientData(pid){
   
    const dialogRef =this.dialog.open(PatientComponent,{
      data: {id:pid},
      width:'75%'
    });
  }
  cb2=(d)=>{
    console.log(d)
  }
  openComplaintDialog(id){
    const dialogRef =this.dialog.open(PopupComponent,{
      data: {id:id},
      width:'75%'
    });
    
    
  }
  openHistoryDialog(id){
    const dialogRef =this.dialog.open(HistoryComponent,{
      data: {id: id}
    });
  }
  openModal(templateRef){
    let dialogRef = this.dialog.open(templateRef, {
      width: '250px',
      // data: { name: this.name, animal: this.animal }
  });
  }
  
  openHistory(templateRef,id){
    let dialogRef = this.dialog.open(templateRef, {
      width: '50%',
     data: { id:id }
  });

  this.http.post('https://digitalapp001.herokuapp.com/api/pat/alldata',{id:id}).subscribe(this.historyCallback)
  }

  PresentHistory
  TreatementHistory;
  PastHistory;
  HistoryOfModeOfIntake;
  FamilyHistory;
  PersonalHistory;
  SubstanceHistory;
  LegalHistory;


  historyCallback=(dt)=>{
    console.log(dt)
    this.PresentHistory=dt.PresentHistoryDetails;
    this.PastHistory=dt.PastHistoryDetails;
    this.HistoryOfModeOfIntake=dt.PastHiHisrotyOfModeOfIntakestorydetails;
    this.TreatementHistory=dt.TreateMentHistoryDetails;
    this.FamilyHistory=dt.FamilyHistoryDetails;
    this.PersonalHistory=dt.PersonalHistoryDetails;
    this.SubstanceHistory=dt.SubstanceHistoryDetails;
    this.LegalHistory=dt.LegalHistoryDetails;
  }
  
  
}

