import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HttpClient,HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
//services
import { ApiInterceptor } from './services/api-interceptor';
import { AuthService } from './services/auth.service';
import { JwtService } from './services/jwt.service';
import { CurrentUserService } from './services/current-user.service';
import { DataSourceService } from './services/data-source.service';
//components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { TimeEntryComponent } from './time-entry/time-entry.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component'


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    TimeEntryComponent,
    FooterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  providers: [AuthService, JwtService ,CurrentUserService, DataSourceService,
      { 
      provide: HTTP_INTERCEPTORS, 
      useClass: ApiInterceptor, 
      multi: true 
      } ],
  bootstrap: [AppComponent]
})

export class AppModule {
	}
