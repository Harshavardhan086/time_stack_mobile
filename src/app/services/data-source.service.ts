import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CurrentUserService } from '../services/current-user.service';

@Injectable()
export class DataSourceService {
	token:any;
	httpOptions:any;

  constructor(private http: HttpClient, private cs: CurrentUserService) { 
  		this.token = this.cs.getAutToken();
  		this.setHeaderOption();
  }

  setHeaderOption(){
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*','user-token': this.token})
    };
  }
  // Get user list
  getUsers(reqObj): Observable<Object>{
	  return this.http.post("https://dev3.resourcestack.com/api/login_user",reqObj, this.httpOptions).map(res=>{
      return res;
	  });
  }

  //get time entry
  getTimeEntry(reqObj): Observable<Object>{
    return this.http.post("https://dev3.resourcestack.com/api/get_time_entry", reqObj, this.httpOptions).map(res =>{
      console.log(res);
      //this.cs.setAuth(res)
      return res;
    });
  };
   
  // Submit TimeEntry 
  sendTimeEntry(reqObj): Observable<Object>{
    return this.http.post("https://dev3.resourcestack.com/api/send_entry", reqObj, this.httpOptions).map(res =>{
      return res; 
    });
  };

  //Jump to another time entry
  update_date(reqObj): Observable<Object>{
    return this.http.post("https://dev3.resourcestack.com/api/update_date", reqObj, this.httpOptions).map(res =>{
      console.log(res);
      //this.cs.setAuth(res)
      return res;
    });
  };

  //get tasks
  getTasks(reqObj): Observable<Object>{
    return this.http.post("https://dev3.resourcestack.com/api/get_tasks", reqObj, this.httpOptions).map(res =>{
      console.log(res);
      //this.cs.setAuth(res)
      return res;
    });
  };

  //get submitted timesheet
  getSubmittedTimesheet(reqObj): Observable<Object>{
    return this.http.post("https://dev3.resourcestack.com/api/get_submitted_timesheet", reqObj, this.httpOptions).map(res =>{
      console.log(res);
      //this.cs.setAuth(res)
      return res;
    });
  };

  //approve timesheet
  approve(reqObj): Observable<Object>{
    return this.http.post("https://dev3.resourcestack.com/api/approve", reqObj, this.httpOptions).map(res =>{
      console.log(res);
      //this.cs.setAuth(res)
      return res;
    });
  };

  //reject submitted timesheet
  reject(reqObj): Observable<Object>{
    return this.http.post("https://dev3.resourcestack.com/api/reject", reqObj, this.httpOptions).map(res =>{
      console.log(res);
     // this.cs.setAuth(res)
      return res;
    });
  };

  
}
