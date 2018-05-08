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
	appointmentAction: string = '';
  timeEntry: any = {};

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
          this.timeEntry = res;
          if (this.timeEntry.status === 'ok') {
            const entryDetails = this.timeEntry.timeEntry_hash;
            (<FormGroup>this.newEntryForm)
              .patchValue({tasks: entryDetails.task_id}, {onlySelf: true});
            (<FormGroup>this.newEntryForm)
              .patchValue({project: entryDetails.project_id}, {onlySelf: true});
            (<FormGroup>this.newEntryForm)
              .patchValue({hours: entryDetails.hours}, {onlySelf: true});
            (<FormGroup>this.newEntryForm)
              .patchValue({vacation: entryDetails.vacation_type_id}, {onlySelf: true});
            (<FormGroup>this.newEntryForm)
              .patchValue({description: entryDetails.activity_log}, {onlySelf: true});
              console.log(this.newEntryForm.value)
            }
          }, err => {
            console.log(err);
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