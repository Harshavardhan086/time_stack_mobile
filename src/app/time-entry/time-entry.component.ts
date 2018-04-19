import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-entry',
  templateUrl: './time-entry.component.html',
  styleUrls: ['./time-entry.component.scss']
})
export class TimeEntryComponent implements OnInit {
	time = {hour: 13, minute: 30};
  constructor() { }

  ngOnInit() {
  }

}
