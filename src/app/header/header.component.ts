import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserService } from '../services/current-user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedUserInfo:any;
  constructor(private cs: CurrentUserService, private router:Router) { }

  ngOnInit() {
  	this.loggedUserInfo = this.cs.getCurrentUser();
  }

  logout(){
  	this.cs.purgeAuth();
  	this.router.navigate(['/home']);
  };
}

interface userInfo{
  name:string,
  email: string
}