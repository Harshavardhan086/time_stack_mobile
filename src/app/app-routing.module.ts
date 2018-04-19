import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { timeEntryComponent} from './time-entry';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: WelcomeComponent
  }
 ];

 @NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})

export class AppRoutingModule { }