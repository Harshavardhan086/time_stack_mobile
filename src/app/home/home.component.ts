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
  warning: string; 
  week_id: Number;
  weekPresence: Boolean = false;



  constructor(private router: Router,
              private cs: CurrentUserService, 
              private tec: TimeEntryComponent,
              private jwtService: JwtService,
              ) { }

  ngOnInit() {
    this.warning = ""
    this.imessage();
    console.log("Checking for values",this.jwtService.getWeek())
  };


  entryClick(){
    if(this.jwtService.getWeek() != undefined){
      console.log("with Week")
      this.tec.getEntry();
      this.router.navigate(['/time-entry']);

    } else {
      console.log("Without Week")
      this.router.navigate(['/time-entry']);
    }
    
  };

  approveClick(){
  	this.router.navigate(['/approve-reject']);

  };

  submission(){
    this.tec.submitTimesheet();
    this.warning = "Week has been submitted"
  }

  //proper message
    imessage(){
    console.log("Week?",this.currentWeek)
    this.currentWeek = this.jwtService.getWeek()
    this.currentUser = this.jwtService.getCurrentUser()
    console.log("currentWeek",this.currentWeek,"currentUser",this.currentUser)
    if(this.currentUser != null && this.currentWeek != undefined) {
      this.warning = "NOTICE: Clicking Submit will submit the week for approval"}
      else {
        console.log("me")
      }
  };


  isLogout(){
    console.log("looking",this.currentUser)
    this.currentUser = this.cs.getCurrentUser()
    if(this.currentUser == null) {
      this.weekPresence = true };
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
