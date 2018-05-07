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
  timeEntry: any;
  Hours: any;




  constructor(	private fb: FormBuilder,
  				private router: Router,
  				private uAuthService: AuthService,
  				private cs: CurrentUserService,
  				private ds: DataSourceService){
  			
  				};

  ngOnInit() {
    this.reqObj.email = this.cs.getCurrentUser();
    this.ds.getTimeEntry(this.reqObj).subscribe(res => {
          console.log('auth response:', res);
          this.router.navigate(['/time-entry']);
          this.timeEntry = res;
          
          });
    this.createForm();
  };
createForm(){
  console.log(this.timeEntry)
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