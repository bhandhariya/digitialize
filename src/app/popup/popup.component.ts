import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  constructor(private arout:ActivatedRoute,private http:HttpClient,@Inject(MAT_DIALOG_DATA) public data: any) { }
  id;
  ngOnInit() {
    this.id=this.data.id;
    console.log(this.id)
    this.getComplaintandIllnessData();
  }
  getComplaintandIllnessData(){
    var obj={
      id:this.id
    }
    this.http.post('/api/pat/alldata',obj).subscribe(this.cb)
  }
  Complaint;Illness;
  cb=(dt)=>{
    console.log(dt)
    this.Complaint=dt.Complaintsdetails;
    console.log(this.Complaint)
    this.Illness=dt.Illnessdetails;
    console.log(this.Illness)
  }

}
