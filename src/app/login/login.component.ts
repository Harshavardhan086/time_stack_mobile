import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CurrentUserService } from '../services/current-user.service';
import { Router, RouterModule } from '@angular/router';
import { TimeEntryComponent } from '../time-entry/time-entry.component'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	userInfo :loginType;
	reqTokenObj = <authType>{};
	token = String;
	response:any;
  timeEntry: any;
  hours: any;
  warning: string;



  constructor(private fb: FormBuilder, 
              private cs: CurrentUserService, 
              private uAuthService: AuthService, 
              private router: Router,
              private tec: TimeEntryComponent) { 
      this.createForm();
  }

  ngOnInit() {}

  createForm(){
    this.loginForm = this.fb.group({
      userName:['', Validators.required],
      userPassword: ['', Validators.required]
    })
  };

  login(){
    this.warning = ""
  	this.userInfo = this.loginForm.value;
  	if(this.userInfo.userName && this.userInfo.userPassword){
  		this.reqTokenObj.email = this.userInfo.userName;
  		this.reqTokenObj.password = this.userInfo.userPassword;
  		this.uAuthService.getAuthToken(this.reqTokenObj).subscribe(res => {
  			this.response = res;
        if(this.response.status == 'ok'){
        window.location.reload();
        window.location.href=('#') } 
        else {
          this.warning =this.response.message
        }


  		}, err=> {
  			console.log(err)
  		});

  	} else {
  		return false;

  	};
  }

}

interface loginType{
	userName: String,
	userPassword: any
}

interface authType{
	email: String,
	password: String
}

interface authTokenType{
	application_representative: any,
	authentication_token: String,
	email: String
}
