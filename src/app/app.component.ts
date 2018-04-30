import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Http, HttpModule } from '@angular/http';
import { DataSourceService } from './services/data-source.service'
import { CurrentUserService } from './services/current-user.service'
import { Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	title = 'app';
	today = Date.now();

  userList: any[];
  reqObj:any ={};
  response: any = {};
  currentUserInfo:any;

  constructor(private ds: DataSourceService, private cus: CurrentUserService) { 

  }
  ngOnInit() {
    //this.http.get('http://localhost:3000/api/get_all_users').subscribe(json => console.log(json));
    this.getUsers();
  }

  getUsers(){
    this.reqObj.email = this.cus.getCurrentUser();
    this.ds.getUsers(this.reqObj).subscribe(res=>{
      this.response = res;
      if(this.response.status == 'ok'){
        this.userList = this.getUserList(this.response);
        console.log(res)
        console.dir(this.userList)
      }
    }, err=>{
      console.log(err);
    });
  }

  getUserList(response){
    if ((response.users_data.length )){
      var ul:any[] = [];
      ul = response.users_data;
      for(let i =0; i<response.users_data.length;++i){
        var ui: any = {};
        ui.email= response.users_data[i]['email'];
        ul[i]['userInfo'] = ui;
      }
      return ul;
    } else {
      return [];
    }
  }
}
