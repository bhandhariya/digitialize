import { Component, OnInit, ViewChild } from '@angular/core';
import { ChangepasswordService } from '../services/changepassword.service';
import { Router,ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  password;customLoadingTemplate;
  submmited : boolean = false;
  @ViewChild('formCtrl') formCtrl;
  loading: boolean;
  id: string;
  user;
  constructor(private changepasswordService:ChangepasswordService, private router:Router,private activatedRoute:ActivatedRoute) { 
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.loading = true;
    this.changepasswordService.getUserById(this.id).subscribe(res =>{
      this.loading = false;
      this.user = res;
    },err =>  this.loading = false);
  }

  onSubmit(formData){
    this.submmited = true;
    if(this.formCtrl.valid){
      this.loading = true;
      this.user.Password = formData.Password;
      this.changepasswordService.resetPassword(this.id,this.user).subscribe(res =>{
        this.loading = false;
        this.router.navigate(['login']);
        Swal.fire({type: 'success',title: 'Password reset successfully',showConfirmButton: false,timer: 1000});
      },err => this.loading = false);
    }
  }

}
