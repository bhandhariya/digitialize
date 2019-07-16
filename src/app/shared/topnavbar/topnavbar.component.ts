import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AngularFireAuth } from "@angular/fire/auth";
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-topnavbar',
  templateUrl: './topnavbar.component.html',
  styleUrls: ['./topnavbar.component.css']
})
export class TopnavbarComponent implements OnInit {
  loading: boolean;
  customLoadingTemplate;
  constructor(private router:Router,private auth:AngularFireAuth,private http:HttpClient) {
    this.getUsername();
   }

  ngOnInit() {
    this.getUsername();
  }

  logOut(){
    this.loading = true;
    this.auth.auth.signOut();
    sessionStorage.clear();
    Swal.fire({type: 'success',title: 'Logout Successfully',showConfirmButton: false,timer: 1000});
    this.router.navigate(['login']);
    this.loading = false;
  }
  gotoProfile(){
    this.router.navigate(['dashboard/profile'])
  }
  displayName="Dummy";
  getUsername(){
    var id=sessionStorage.getItem('MID')
    var obj={
      id:id
    }
   this.http.post('/api/users/getDataById',obj).subscribe(this.cb)
    
  }
  cb=(dt)=>{
    this.displayName=(dt.name)
  }
}
