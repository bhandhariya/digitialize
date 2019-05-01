import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topnavbar',
  templateUrl: './topnavbar.component.html',
  styleUrls: ['./topnavbar.component.css']
})
export class TopnavbarComponent implements OnInit {
  loading: boolean;
  customLoadingTemplate;
  constructor(private router:Router) { }

  ngOnInit() {
  }

  logOut(){
    this.loading = true;
    sessionStorage.clear();
    Swal.fire({type: 'success',title: 'Logout Successfully',showConfirmButton: false,timer: 1000});
    this.router.navigate(['login']);
    this.loading = false;
  }
}
