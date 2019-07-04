import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

const ELEMENT_DATA = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  id;
  constructor(private arout:ActivatedRoute,private http:HttpClient,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    // this.arout.paramMap.subscribe(r=>{
    //   this.id=r.get('id');
    // })
    this.id=this.data.id;
    console.log(this.data.id)
    this.getPatientData();
  }
  
 displayedColumns: string[] = ['complain','complain_duration','createdBy','creationDate','patient_id','_id'];
//  dataSource=ELEMENT_DATA;
dataSource;
getPatientData(){
  var obj={
    id:this.id
  }
  this.http.post('https://digitalapp001.herokuapp.com/api/pat/alldata',obj).subscribe(this.cb)
}
cb=r=>{
  this.dataSource=r;
 console.log(this.dataSource)
  
}
bgloid=0;
patientEdit(id){
  console.log(id)
  this.bgloid=id
}
first_name;middle_name;last_name
check(d){
  
  console.log(this.first_name)
  console.log(this.middle_name)
console.log(this.last_name)
}
cancle(){
  this.bgloid=0;
}


}

// @Component({
//   selector: 'app-complaint-popup',
//   templateUrl: './complaint-pop.component.html'
// })
// export class ComplaintPopupComponent implements OnInit {
//   id;
//   constructor(private arout:ActivatedRoute,private http:HttpClient,@Inject(MAT_DIALOG_DATA) public data: any) { }

//   ngOnInit() {
//     console.log(this.data.id)
//     this.getComplaintDetails();
//   }
//   getComplaintDetails(){
//     var obj={
//       id:this.data.id
//     }
//     console.log(obj)
//      this.http.post('https://digitalapp001.herokuapp.com/api/pat/alldata',obj).subscribe(this.cb)
//   }
//   dataSource;
//   cb=(dt)=>{
    
//     this.dataSource=(dt.Complaintsdetails)
//     console.log(this.dataSource);

//   }
//   displayedColumns: string[] = ['complain', 'complain_duration', 'createdBy', 'creationDate','patient_id'];

// }

// @Component({
//   selector: 'app-illness-popup',
//   templateUrl: './illness-pop.component.html',
//   styleUrls: ['./patient.component.css']
// })
// export class IllnessPopupComponent implements OnInit {
//   id;
//   constructor(private arout:ActivatedRoute,private http:HttpClient,@Inject(MAT_DIALOG_DATA) public data: any) { }

//   ngOnInit() {
//     console.log(this.data.id)
//     this.getIllnessDetails();
//   }
//   getIllnessDetails(){
//     var obj={
//       id:this.data.id
//     }
//     console.log(obj)
//      this.http.post('https://digitalapp001.herokuapp.com/api/pat/alldata',obj).subscribe(this.cb)
//   }
//   illness;
//   dataSource;
//   cb=(dt)=>{
    
//     this.dataSource=(dt.Illnessdetails)
//     console.log(this.dataSource);

//   }
//   displayedColumns: string[] = ['Course', 'CurruntEpisodeNumber', 'DurationOfCurruntIllness', 'ModeOfOnset','PrecipatingFactors','PredisposingFactors','PrepetuatingFactors'];

// }