import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {environment} from "../../../../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({
    responseType: 'text'
  }),
};

@Injectable({
  providedIn: 'root'
})
export class AccountService{
  headers = new HttpHeaders({ 'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*' ,
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    'Access-Control-Expose-Headers' : 'Content-Disposition',
    "Access-Control-Max-Age": "86400"});
  constructor(private router: Router, private httpClient: HttpClient) {
  }



  getUser(): Observable<any>{

    // @ts-ignore
    return this.httpClient.get(`${environment.apiUrl}/account/get`,{headers: this.headers}).pipe(catchError(this.handleError));
  }

  putUser(data: any): Observable<any> {

    // @ts-ignore
    return this.httpClient.put<any>(`${environment.apiUrl}/account/update`, data, {headers: this.headers,responseType:"text"}).pipe(catchError(this.handleError),);
  }
  changepassword(data: any): Observable<any> {

    // @ts-ignore
    return this.httpClient.post<any>(`${environment.apiUrl}/account/changepassword`, data, {headers: this.headers,responseType:"text"}).pipe(catchError(this.handleError),);
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
