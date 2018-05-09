import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray} from '@angular/forms';
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
          console.log('timeEntry response:', res);
          this.timeEntry = res;
          if (this.timeEntry.status === 'ok') {
            const entryDetails = this.timeEntry.timeEntry_hash;

            (<FormGroup>this.newEntryForm)
              .patchValue({task_id: entryDetails.task_id}, {onlySelf: true});
            (<FormGroup>this.newEntryForm)
              .patchValue({project_id: entryDetails.project_id}, {onlySelf: true});
            (<FormGroup>this.newEntryForm)
              .patchValue({hours: entryDetails.hours}, {onlySelf: true});
            (<FormGroup>this.newEntryForm)
              .patchValue({vacation_type_id: entryDetails.vacation_type_id}, {onlySelf: true});
            (<FormGroup>this.newEntryForm)
              .patchValue({activity_log: entryDetails.activity_log}, {onlySelf: true});
              console.log(this.newEntryForm.value)
            }
          }, err => {
            console.log(err);
          });
    this.createForm();
  };
createForm(){
    this.newEntryForm = this.fb.group({
      project_id: [''],
      task_id: [''],
      hours: [''],
      vacation_type_id: [''],
      activity_log: ['']
    })
  }
  createEntry(){
    this.reqObj = this.newEntryForm.value;
    this.reqObj.email = this.cs.getCurrentUser();
    console.log(this.reqObj)
    //call the data.source method to deliver items
    this.ds.sendTimeEntry(this.reqObj).subscribe(timeEntry =>{
      this.timeEntry = timeEntry;
      if(this.timeEntry.status == 'ok'){
        alert(this.timeEntry.message)
      }
    }, err => {
      console.log(err);
    });
    this.router.navigate(['/time_entry'])
    alert("successful update");
  }

}