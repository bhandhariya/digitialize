import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  id;
  constructor(private arout:ActivatedRoute,private http:HttpClient,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.id=this.data.id;
    console.log(this.id);
    this.getHistrory();
  }
  getHistrory(){
    var obj={
      id:this.id
    }
    this.http.post('https://digitalapp001.herokuapp.com/api/pat/alldata',obj).subscribe(this.cb)
  }
  PresentHistory;PastHistory;
  cb=(dt)=>{
    console.log(dt)
   this.PresentHistory=dt.PresentHistoryDetails;
    this.PastHistory=dt.PastHistoryDetails;
  }

}
