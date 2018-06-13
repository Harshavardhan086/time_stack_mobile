import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserService } from '../services/current-user.service';
import { DataSourceService } from '../services/data-source.service';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-approve-reject',
  templateUrl: './approve-reject.component.html',
  styleUrls: ['./approve-reject.component.scss']
})
export class ApproveRejectComponent implements OnInit {

  submitted:any={}
  timesheet: any[];
  reqObj:any = {};
  response:any;
  hideRow:any=true;
  URL: string;

  constructor(	private uAuthService: AuthService,
  				private router: Router,
        		private cs: CurrentUserService,
        		private ds: DataSourceService) { }

  ngOnInit() {
    this.loadSheet();
    this.findURL();
  }
  findURL(){
    this.URL = window.location.href
    console.log("Working?", this.URL)
  }

  loadSheet(){
        this.reqObj.email = this.cs.getCurrentUser();

    this.ds.getSubmittedTimesheet(this.reqObj).subscribe(res => {
      console.log('timesheet response:', res);
      
      this.submitted = res;
      this.timesheet = this.submitted.timesheet;
      
      if (this.submitted.status === 'ok') {
        console.log("successful")
      }else{
        console.log("successful")
      }
    });
  }

  approve(event: any){

  	var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
  	
  	this.reqObj.email = this.cs.getCurrentUser();
    this.reqObj.week_id= value;
    
    this.ds.approve(this.reqObj).subscribe(res => {
    	this.response = res;
      window.location.href = '#';

      if (this.response.status === 'ok') {

      }
      }, err => {
        console.log(err);

        
    });

    
  };


  reject(event: any){
  	var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;

	this.reqObj.email = this.cs.getCurrentUser();
    this.reqObj.week_id= value;
    
    this.ds.reject(this.reqObj).subscribe(res => {
    	this.response = res;
      window.location.href = '#';
      if (this.response.status === 'ok') {

      	}
      }, err => {
        console.log(err);

        
    });
    //this.router.navigate(['/approve-reject']);
      

  };

  show_row(row){
  	if (row == true){
  		this.hideRow = false;
  	}
  	else{
  		this.hideRow = true;
  	}
  }
}
