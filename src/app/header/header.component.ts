import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserService } from '../services/current-user.service';
import { AuthGuardService } from '../services/auth-guard.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedUserInfo:any;
  loggedin: boolean;
  currentUser: string;
  today = Date.now(); 

 
  constructor(private cs: CurrentUserService, 
              private router:Router,
             ) { }

  ngOnInit() {
  	this.loggedUserInfo = this.cs.getCurrentUser();
    this.isLogin();
  }

  logout(){
  	this.cs.purgeAuth();
  	this.router.navigate(['/home']);
  };

  isLogout(){
    this.currentUser = this.cs.getCurrentUser()
    if(this.currentUser == null) {
      return false;
    } else {
      return true;
    }
  };//islogout

  isLogin(){
    this.currentUser = this.cs.getCurrentUser()
    if(this.currentUser == null) {
      return true;
    } else {
      return false;
    }
  };//islogin

}//export



interface userInfo{
  name:string,
  email: string
}