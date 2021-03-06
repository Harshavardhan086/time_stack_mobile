import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

import { HomeComponent } from './home/home.component';
import { TimeEntryComponent} from './time-entry/time-entry.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { ApproveRejectComponent } from './approve-reject/approve-reject.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'time-entry',
    component: TimeEntryComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'approve-reject',
    component: ApproveRejectComponent,
    canActivate: [AuthGuardService]
  },
   { 
     path: '**', 
     redirectTo: '/home', 
     pathMatch: 'full'}
 ];

 @NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})

export class AppRoutingModule { }