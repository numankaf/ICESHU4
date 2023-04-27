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
  constructor(private router: Router, private httpClient: HttpClient) {
  }



  getUser(id: number): Observable<any>{
    return this.httpClient.get(`${environment.apiUrl}/student/get/${id}`).pipe(catchError(this.handleError));
  }

  putUser(id: number, data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put<any>(`${environment.apiUrl}/student/update/${id}`, data, { headers }).pipe(catchError(this.handleError));
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
