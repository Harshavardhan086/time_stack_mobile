import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray, NgForm} from '@angular/forms';
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
  today = Date.now();  
	newEntryForm: FormGroup;
  newDateForm: FormGroup;
	reqObj:any = {};
  timeEntry: any = {};

  //For the DateDropDown
  dropDown:any =[];
  dSelected:Number;
  modifiedtext:string;

  //For Projects
  project: any[];
  pSelected:Number;

  //For Tasks
  task: any=[];
  taskHash: any={};
  tSelected:Number;

  //For vacations
  vacation: any=[];
  vacationHash: any={};
  vSelected:Number;

  constructor(	private fb: FormBuilder,
        				private router: Router,
        				private uAuthService: AuthService,
        				private cs: CurrentUserService,
        				private ds: DataSourceService){
  				};

  ngOnInit() {
 
    this.createForm();
    this.getEntry();
  };


  getEntry(){
    this.reqObj.email = this.cs.getCurrentUser();

    this.ds.getTimeEntry(this.reqObj).subscribe(res => {
      console.log('timeEntry response:', res);
      
      this.timeEntry = res;
      
      if (this.timeEntry.status === 'ok') {
        this.dropDown = this.timeEntry.date_of_activity;
        this.project = this.timeEntry.avaliable_projects;
        this.vacation = this.timeEntry.vacations;
        //selects the first date for dropdown
        this.dSelected = this.dropDown[0]
        console.log("DropDown",this.dropDown[0])
        const entryDetails = this.timeEntry.timeEntry_hash;
          
        (<FormGroup>this.newEntryForm)
          .patchValue({id: entryDetails.id}, {onlySelf: true});
        (<FormGroup>this.newEntryForm)
          .patchValue({user_id: entryDetails.user_id}, {onlySelf: true});
        (<FormGroup>this.newEntryForm)
          .patchValue({week_id: entryDetails.week_id}, {onlySelf: true});
        (<FormGroup>this.newEntryForm)
          .patchValue({task: entryDetails.task_id}, {onlySelf: true});
        (<FormGroup>this.newEntryForm)
          .patchValue({project: entryDetails.project_id}, {onlySelf: true});
        (<FormGroup>this.newEntryForm)
          .patchValue({hours: entryDetails.hours}, {onlySelf: true});
        (<FormGroup>this.newEntryForm)
          .patchValue({vacation_type_id: entryDetails.vacation_type_id}, {onlySelf: true});
        (<FormGroup>this.newEntryForm)
          .patchValue({activity_log: entryDetails.activity_log}, {onlySelf: true});
          console.log(this.newEntryForm.value);
        }
      }, err => {
        console.log(err);
        alert("Please Visit https://chronstack.com ")
      //this.router.navigate(['/home']);
    });
  }
///
  onDaySelected(val:any){
      this.customFunction(val);
      console.log(val);
    };  
  customFunction(val:any){
      this.modifiedtext = "Time Entry Selection: " + val
    };

  loadTasks(val:any){

    this.reqObj.email = this.newEntryForm.value.user_id
    this.reqObj.project_id= val;
    this.pSelected = val;
    console.log(this);
    this.ds.getTasks(this.reqObj).subscribe(res => {
      console.log('task response:', res);
      this.taskHash = res;
      if (this.taskHash.status === 'ok') {
        console.log(this.taskHash.task_hash.avaliable_tasks);      
        this.task = this.taskHash.task_hash.avaliable_tasks;
      }
      }, err => {
        console.log(err);
        alert("Please Start Current Week on Desktop App!")
        //this.router.navigate(['/home']);
    });
     
  };
 
  createForm(){
    this.newEntryForm = this.fb.group({
      project: [''],
      task: [''],
      hours: [''],
      vacation: [''],
      activity_log: [''],
      user_id: [this.timeEntry.user_id],
      id: [this.timeEntry.id],
      week_id: [this.timeEntry.week_id]
    });
     this.newDateForm = this.fb.group({
      date_of_activity: [''],
    })
  };

  //update_date
  update_date(){
    this.reqObj.date_of_activity = this.dSelected
    this.reqObj.email = this.newEntryForm.value.user_id
    //pass the parameters
    this.ds.update_date(this.reqObj).subscribe(timeEntry =>{
      this.timeEntry = timeEntry;
      if (this.timeEntry.status === 'ok') {
        this.dropDown = this.timeEntry.date_of_activity;
        console.log(this.dropDown)
        const entryDetails = this.timeEntry.timeEntry_hash;
        (<FormGroup>this.newEntryForm)
          .patchValue({id: entryDetails.id}, {onlySelf: true});
        (<FormGroup>this.newEntryForm)
          .patchValue({user_id: entryDetails.user_id}, {onlySelf: true});
        (<FormGroup>this.newEntryForm)
          .patchValue({week_id: entryDetails.week_id}, {onlySelf: true});
        (<FormGroup>this.newEntryForm)
          .patchValue({task: entryDetails.task_id}, {onlySelf: true});
        (<FormGroup>this.newEntryForm)
          .patchValue({project: entryDetails.project_id}, {onlySelf: true});
        (<FormGroup>this.newEntryForm)
          .patchValue({hours: entryDetails.hours}, {onlySelf: true});
        (<FormGroup>this.newEntryForm)
          .patchValue({vacation: entryDetails.vacation_type_id}, {onlySelf: true});
        (<FormGroup>this.newEntryForm)
          .patchValue({activity_log: entryDetails.activity_log}, {onlySelf: true});
          console.log(this.newEntryForm.value)

        }
      }, err => {
        console.log(err);
      });
    this.createForm();
  };

  createEntry(data: any){
    this.reqObj.email = this.cs.getCurrentUser();
    this.reqObj = this.newEntryForm.value;
    console.log("What I'm Sending", this.reqObj)
    console.log(this.reqObj)
    this.ds.sendTimeEntry(this.reqObj).subscribe(timeEntry =>{
      this.timeEntry = timeEntry;
      if(this.timeEntry.status == 'ok'){
        alert(this.timeEntry.message)
      }
    }, err => {
      console.log(err);
    });
    alert("successful update");
  }
};