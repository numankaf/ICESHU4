import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {environment} from "../../../environments/environment";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private router: Router, private http: HttpClient) {
  }

  jwtHelper = new JwtHelperService();

  public decodeToken(token: string): any {
    return this.jwtHelper.decodeToken(token);
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, credentials).pipe(catchError(this.handleError));
  }

  signup(credentials: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/auth/register`, credentials).pipe(catchError(this.handleError));
  }

  forgotPassword(credentials: any): Observable<any> {
    // @ts-ignore
    return this.http.post<any>(`${environment.apiUrl}/auth/forgotpassword`, credentials,{responseType: 'text'}).pipe(catchError(this.handleError));
  }
  getToken(){
    return sessionStorage.getItem('accessToken');
  }

  get isLoggedIn(): boolean {
    let authToken = sessionStorage.getItem('accessToken');
    return authToken !== null;
  }

  logout(): void {
    sessionStorage.removeItem('accessToken');
    this.router.navigate(['']);
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
