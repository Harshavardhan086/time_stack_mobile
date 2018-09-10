import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserService } from '../services/current-user.service';
import { AuthGuardService } from '../services/auth-guard.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  currentUser: string;

  constructor(private cs: CurrentUserService, 
              private router:Router,) { }

  ngOnInit() {
  }

  logout(){
  	this.cs.purgeAuth();
  	window.location.reload();
  };

  isLogout(){
    this.currentUser = this.cs.getCurrentUser()
    if(this.currentUser == null) {
      return true;
    } else {
      return false;
    }
  };//islogout

  isLogin(){
    this.currentUser = this.cs.getCurrentUser()
    if(this.currentUser == null) {
      return false;
    } else {
      return true;
    }
  };//islogin
  
}
