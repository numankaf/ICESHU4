import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authenticationService.getToken();
    req = req.clone({
      setHeaders: {
        Authorization: authToken+""
      }
    });
    return next.handle(req);
  }
}
