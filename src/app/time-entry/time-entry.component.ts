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

//Alert Message
  warning: string;
  warning1: string;

//startdate
 displayDay: any=[]; 
  
  constructor(	private fb: FormBuilder,
        				private router: Router,
        				private uAuthService: AuthService,
        				private cs: CurrentUserService,
        				private ds: DataSourceService){};

  ngOnInit() {
    this.createForm();
    this.getEntry();
  };

  // get day,month & year by date format
  getDateObject(date){
    if(date){
      let tempDate:any = date;
      let dateObj: any = {
        day: new Date(tempDate).getDate() + 1,
        month: new Date(tempDate).getMonth() + 1,
        year: new Date(tempDate).getFullYear()
      };
      //console.log("umm", dayta)
      var dayta = dateObj.year + "/" + dateObj.month +"/"+ dateObj.day
      //this.displayDay = dayta
    }

  }





//
  getEntry(){
    this.reqObj.email = this.cs.getCurrentUser();
    this.ds.getTimeEntry(this.reqObj).subscribe(res => {
      console.log('timeEntry response:', res);
      this.timeEntry = res;
      if(this.timeEntry === null){
        this.warning1 = "your timesheet has already been submitted."
      }
      if (this.timeEntry.status === 'ok') {
        this.dropDown = this.timeEntry.date_of_activity;
        this.project = this.timeEntry.avaliable_projects;
        this.vacation = this.timeEntry.vacations;
        //selects the first date for dropdown
        
        console.log("DropDown",this.dropDown[0])
        const entryDetails = this.timeEntry.timeEntry_hash;

        this.dSelected = entryDetails.date_of_activity;
        this.displayDay = entryDetails.date_of_activity;

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
        (<FormGroup>this.newEntryForm)
          .patchValue({date_of_activity: entryDetails.date_of_activity}, {onlySelf: true});
          console.log(this.newEntryForm.value);
          console.log("looking for that status",entryDetails.status_id)
          
        }//end of if
      else { (this.timeEntry.status === 'not_found')
        this.warning = "Hmmm, seems you don't have a timesheet for this week."
        this.router.navigate(['/home']);
        }
      }, err => {
        console.log(err);
        this.warning = "Hmmm, seems to be a problem with your timesheet."
        this.router.navigate(['/home']);

    });
  }

//

//


  onDaySelected(val:any){
      this.customFunction(val);
      console.log(val);
    };  
  customFunction(val:any){
      this.modifiedtext = "Time Entry Selection: " + val
    };

  loadTasks(val:any){

    this.reqObj.email = this.cs.getCurrentUser();
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

        //this.router.navigate(['/home']);
    });
     
  };
 
  createForm(){
    this.newEntryForm = this.fb.group({
      project: ['',Validators.required],
      task: [''],
      hours: ['',[Validators.required,Validators.pattern('[0-9]')]],
      vacation: [''],
      activity_log: ['',[Validators.required,Validators.maxLength(500)]],
      user_id: [this.timeEntry.user_id],
      id: [this.timeEntry.id],
      week_id: [this.timeEntry.week_id],
      date_of_activity: [this.timeEntry.date_of_activity]
    });
     this.newDateForm = this.fb.group({
      date_of_activity: [''],
    })
  };

  //update_date
  update_date(){
    this.reqObj.date_of_activity = this.dSelected
    this.reqObj.email = this.cs.getCurrentUser();
    //pass the parameters
    this.ds.update_date(this.reqObj).subscribe(timeEntry =>{
      this.timeEntry = timeEntry;
      if (this.timeEntry.status === 'ok') {
        this.dropDown = this.timeEntry.date_of_activity;
        console.log(this.dropDown)
        const entryDetails = this.timeEntry.timeEntry_hash;
        this.dSelected = entryDetails.date_of_activity;
        this.displayDay = entryDetails.date_of_activity;
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
        (<FormGroup>this.newEntryForm)
          .patchValue({date_of_activity: entryDetails.date_of_activity}, {onlySelf: true});
        console.log(this.newEntryForm.value)

        }
      }, err => {
        console.log(err);
      });
    this.createForm();
  };


  createEntry(status:string){

    this.reqObj = this.newEntryForm.value;
    this.reqObj.email = this.cs.getCurrentUser();
    this.reqObj.status = status;
    
    this.ds.sendTimeEntry(this.reqObj).subscribe(timeEntry =>{
      this.timeEntry = timeEntry;
      if(this.timeEntry.status === 'ok'){
        console.log(this.timeEntry.message) 
        console.log("WHAT IS THE STATUS",this.reqObj.status)
         this.warning = "Your timesheet has been saved!"
         this.router.navigate(['/time-entry']); 
      } 
    }, err => {
      this.warning = "Timesheet not saved/submitted"
      console.log(err);
    });
    
  }

  submitTimesheet(){
    if(confirm("Are you sure to submit complete week")) {
      console.log("submit the timesheet");
      this.createEntry('submit');
    }else{
    return false;
    }
  };
};

