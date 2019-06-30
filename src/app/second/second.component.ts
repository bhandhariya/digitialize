import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.css']
})
export class SecondComponent implements OnInit {

  constructor(private arout:ActivatedRoute,private router:Router,private http:HttpClient
    ) { }
  id;
  ngOnInit() {
    this.arout.paramMap.subscribe(r=>{
      this.id=r.get('id');
      console.log(this.id)
    })
  }
  familyForm=new FormGroup({
    id: new FormControl(this.id),
    fatherName : new FormControl('',Validators.required),
    fatherAddress : new FormControl(''),
    fatherNumber : new FormControl(''),
    fatherEmail : new FormControl(''),
    guardianName : new FormControl(''),
    guardianAddress : new FormControl(''),
    guardianNumber : new FormControl(''),
    guardianEmail : new FormControl(''),
    spouseName : new FormControl(''),
    spouseAddress : new FormControl(''),
    spouseNumber : new FormControl(''),
    spouseEmail : new FormControl(''),
    spouseAge : new FormControl(''),
    spouseOccupation : new FormControl(''),
    relationShipStatus: new FormControl(''),
    childernsCount: new FormControl(''),
    updatedBy:new FormControl('')
  })
  save(){
    this.familyForm.get('id').setValue(this.id);
    this.familyForm.get('updatedBy').setValue(sessionStorage.getItem('MID'));
    console.log(this.familyForm.value)
    if(this.familyForm.valid){
      console.log(this.familyForm.value)
       this.http.post('http://localhost:3000/api/pat/addFamilyData',this.familyForm.value).subscribe(this.addFamilyDataCB)
    }else{
      Swal.fire('Please fill required Fields')
    }
  }
  addFamilyDataCB=(dt)=>{
    console.log(dt);
    if(dt.first_name){
      Swal.fire('Personal Details Saved SuccessFully');
      this.router.navigate(['dashboard/accordian',{id:dt._id}])
      
    }else{
      Swal.fire('error Occured ')
    }
  }

}
