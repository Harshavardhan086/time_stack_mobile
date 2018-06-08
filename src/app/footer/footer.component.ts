import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserService } from '../services/current-user.service';
import { AuthGuardService } from '../services/auth-guard.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private cs: CurrentUserService, 
              private router:Router,) { }

  ngOnInit() {
  }

    logout(){
  	this.cs.purgeAuth();
  	this.router.navigate(['/home']);
  };
  
}
