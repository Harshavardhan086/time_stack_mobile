import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TimeEntryComponent } from '../time-entry/time-entry.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  today = Date.now();	


  constructor(private router: Router,
              public tec: TimeEntryComponent,
              ) { }

  ngOnInit() {
  }

  entryClick(){
  	this.router.navigate(['/time-entry']);
  };
  approveClick(){
  	this.router.navigate(['/approve-reject']);
  };
  submission(){
    this.tec.submitTimesheet();
  };

}
