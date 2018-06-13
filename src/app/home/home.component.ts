import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TimeEntryComponent } from '../time-entry/time-entry.component'
import { CurrentUserService } from '../services/current-user.service';
import { JwtService } from '../services/jwt.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  today = Date.now();	
  currentUser: string;
  currentWeek: Number;
  warning: string = "NOTICE: Clicking Submit will submit the week for approval"



  constructor(private router: Router,
              private cs: CurrentUserService, 
              private tec: TimeEntryComponent,
              private jwtService: JwtService,
              ) { }

  ngOnInit() {
    this.warning = "NOTICE: Clicking Submit will submit the week for approval"
    this.tec.getEntry();
  };

  entryClick(){
  	this.router.navigate(['/time-entry']);

  };
  approveClick(){
  	this.router.navigate(['/approve-reject']);

  };
  submission(){
    this.tec.submitTimesheet();
    this.warning = this.tec.warning2;
  };


  isLogout(){
    this.currentUser = this.cs.getCurrentUser()
    if(this.currentUser == null) {
      return true;
    } else {
      return false;
    };
  };//islogout

  isWeek(){
    this.currentWeek = this.jwtService.getWeek()
    if(this.currentWeek == null) {
      return false;
    } else {
      return true;
    }
  };//isWeek


  isUserAdmin(){
    this.currentUser = this.jwtService.getRole()
    console.log("Looking at the role",this.currentUser)
    if(this.currentUser != "admin") {
      return false;
    } else {
      return true; 
    }

  }

}
