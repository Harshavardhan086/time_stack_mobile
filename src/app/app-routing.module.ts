import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { TimeEntryComponent} from './time-entry/time-entry.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';


const routes: Routes = [
	{
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'time-entry',
    pathMatch: 'full',
    component: TimeEntryComponent
  }
 ];

 @NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})

export class AppRoutingModule { }