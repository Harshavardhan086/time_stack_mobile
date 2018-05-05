import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { CurrentUserService } from '../services/current-user.service';
import { DataSourceService } from '../services/data-source.service';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-time-entry',
  templateUrl: './time-entry.component.html',
  styleUrls: ['./time-entry.component.scss']
})
export class TimeEntryComponent implements OnInit {
	// initialize variables
	time = {hour: 13, minute: 30};
	relations:String[];
	visitList: String[];
	newEntryForm: FormGroup;
	reqObj:any = {};
	response: any = {};
	appointmentAction: string = '';



  constructor(	private fb: FormBuilder,
  				private router: Router,
  				private uAuthService: AuthService,
  				private cs: CurrentUserService,
  				private ds: DataSourceService){
  			this.createForm();
  				};

  ngOnInit() {
  };
createForm(){
    this.newEntryForm = this.fb.group({
      project:[''],
      tasks: [''],
      hours: [''],
      vacation:[''],
      description: ['']
    })
  }
  createEntry(){
    this.reqObj = this.newEntryForm.value;
    this.reqObj.email = this.cs.getCurrentUser();
    console.log(this.reqObj)
    //call the data.source method to deliver items
    this.ds.sendTimeEntry(this.reqObj).subscribe(response =>{
      this.response = response;
      if(this.response.status == 'ok'){
        alert(this.response.message)
      }
    }, err => {
      console.log(err);
    });
    this.router.navigate(['/home'])
  }

}