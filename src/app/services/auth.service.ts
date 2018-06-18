import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpResponse } from 'selenium-webdriver/http';
import { CurrentUserService } from './current-user.service';
import { environment } from '../../environments/environment';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*',})
};
@Injectable()
export class AuthService {

  baseUrl: string;

  constructor(private http:HttpClient, private cs: CurrentUserService) {

    this.baseUrl = environment.baseUrl;
  }

  //get token
  getAuthToken(reqObj): Observable<Object>{
  	let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
  	return this.http.post(this.baseUrl+"/login_user", reqObj, httpOptions).map(res =>{
  		console.log(res);
  		this.cs.setAuth(res)
  		return res;
  	});
  }; 
}
interface authTokenType{
  application_representative: any,
  authentication_token: String,
  email: String,

 }

