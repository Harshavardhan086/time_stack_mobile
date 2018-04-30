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
	return this.http.post("http://localhost:3000/api/get_all_users",reqObj, this.httpOptions).map(res=>{
    return res;
	});
	};
}
