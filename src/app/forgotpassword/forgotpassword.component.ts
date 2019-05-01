import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ForgotService } from '../services/forgot.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  email;
  customLoadingTemplate;
  password;
  route : boolean;
  submmited : boolean = false;
  @ViewChild('formCtrl') formCtrl;
  loading: boolean;
  constructor(private router:Router, private forgotService:ForgotService) { }

  ngOnInit() {
  } 

  onSubmit(formData){
    this.submmited = true;
    if(this.formCtrl.valid){
      this.loading = true;
      this.forgotService.getAllUsers().subscribe(res =>{
        for(var i = 0; i < res['length']; i++){
          if(formData.Email == res[i]['Email']){
            this.loading = false;
            this.router.navigate(['changepassword',res[i]['id']]);
            // Swal.fire({type: 'success',title: 'OKK',showConfirmButton: false,timer: 1000});
            break;
          }
        }
        if(i == res['length']){
          this.loading = false;
          Swal.fire({type: 'error',title: 'Please give correct credentials',showConfirmButton: false,timer: 1500});
        }
      },err => this.loading = false);
    }
  }

}
