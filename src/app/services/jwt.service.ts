import { Injectable } from '@angular/core';


@Injectable()
export class JwtService {

  getToken(): String {
    return window.localStorage['jwtToken'];
  }

  saveToken(token: String) {
    window.localStorage['jwtToken'] = token;
  }

  destroyToken() {
    window.localStorage.removeItem('jwtToken');
  }

  saveCurrentUser(userEmail){
    window.localStorage.setItem('userEmail',userEmail);
  }

  getCurrentUser(){
    return window.localStorage.getItem('userEmail');
  }

  removeUser(){
    window.localStorage.removeItem('userEmail');
  }
//for week_id submit feature
  saveWeek(week_id: Number) {
    window.localStorage['week_id'] = week_id
  }

  getWeek(): Number {
    return window.localStorage['week_id'];
  }

  destroyWeek(){
    window.localStorage.removeItem('week_id')
  }
//for user_role
  saveRole(user_type: string) {
    window.localStorage['user_type'] = user_type
  }

  getRole(): string {
    return window.localStorage['user_type'];
  }

  destroyRole(){
    window.localStorage.removeItem('user_type')
  }
}