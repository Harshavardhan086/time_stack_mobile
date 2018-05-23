import {HttpEvent, HttpInterceptor, HttpRequest, HttpHandler} from "@angular/common/http"
import {Injectable} from "@angular/core"
import {Observable} from "rxjs/Observable";
import {JwtService} from "./jwt.service";
import {Router} from "@angular/router";
import { AuthService } from './auth.service';


@Injectable()

export class ApiInterceptor implements HttpInterceptor {

  constructor(public jwtService: JwtService, public router: Router, public auth: AuthService) {}

  public authToken = this.jwtService.getToken();

    
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.jwtService.getToken()}`
      }
    });
    return next.handle(req).catch((error,caught)=>{
      return Observable.throw(error)
    })as any;
  }
}

