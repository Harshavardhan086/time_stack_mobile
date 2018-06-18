import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CurrentUserService } from '../services/current-user.service';
import { environment } from '../../environments/environment';

@Injectable()
export class DataSourceService {
	token:any;
	httpOptions:any;
  baseUrl: string;

  constructor(private http: HttpClient, private cs: CurrentUserService) { 
  		this.token = this.cs.getAutToken();
  		this.setHeaderOption();
      this.baseUrl = environment.baseUrl;
  }

  setHeaderOption(){
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*','user-token': this.token})
    };
  }
  // Get user list
  getUsers(reqObj): Observable<Object>{
	  return this.http.post(this.baseUrl +"/login_user",reqObj, this.httpOptions).map(res=>{
      return res;
	  });
  }

  //get time entry
  getTimeEntry(reqObj): Observable<Object>{
    return this.http.post(this.baseUrl +"/get_time_entry", reqObj, this.httpOptions).map(res =>{
      console.log(res);
      //this.cs.setAuth(res)
      return res;
    });
  };
   
  // Submit TimeEntry 
  sendTimeEntry(reqObj): Observable<Object>{
    return this.http.post(this.baseUrl +"/send_entry", reqObj, this.httpOptions).map(res =>{
      return res; 
    });
  };

  //Jump to another time entry
  update_date(reqObj): Observable<Object>{
    return this.http.post(this.baseUrl +"/update_date", reqObj, this.httpOptions).map(res =>{
      console.log(res);
      //this.cs.setAuth(res)
      return res;
    });
  };

  //get tasks
  getTasks(reqObj): Observable<Object>{
    return this.http.post(this.baseUrl +"/get_tasks", reqObj, this.httpOptions).map(res =>{
      console.log(res);
      //this.cs.setAuth(res)
      return res;
    });
  };

  //get submitted timesheet
  getSubmittedTimesheet(reqObj): Observable<Object>{
    return this.http.post(this.baseUrl +"/get_submitted_timesheet", reqObj, this.httpOptions).map(res =>{
      console.log(res);
      //this.cs.setAuth(res)
      return res;
    });
  };

  //approve timesheet
  approve(reqObj): Observable<Object>{
    return this.http.post(this.baseUrl +"/approve", reqObj, this.httpOptions).map(res =>{
      console.log(res);
      //this.cs.setAuth(res)
      return res;
    });
  };

  //reject submitted timesheet
  reject(reqObj): Observable<Object>{
    return this.http.post(this.baseUrl +"/reject", reqObj, this.httpOptions).map(res =>{
      console.log(res);
     // this.cs.setAuth(res)
      return res;
    });
  };

    // submit timesheet
  submitWeek(reqObj): Observable<Object>{
    return this.http.post(this.baseUrl +"/submit_week", reqObj, this.httpOptions).map(res =>{
      console.log(res);
     // this.cs.setAuth(res)
      return res;
    });
  };

  
}
