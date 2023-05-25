import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {environment} from "../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class BanStudentsService{
  headers = new HttpHeaders({ 'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*' ,
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    'Access-Control-Expose-Headers' : 'Content-Disposition',
    "Access-Control-Max-Age": "86400"});
  constructor(private httpClient : HttpClient) {
  }

  getStudents():Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/user/findAllByRole/0`).pipe(catchError(this.handleError))
  }

  getUnbannedStudents():Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/user/getBannedUsers`).pipe(catchError(this.handleError))
  }

  banStudent(userId: number) : Observable<any> {
    return this.httpClient.put(`${environment.apiUrl}/user/banUser/${userId}`, null,{headers: this.headers,responseType:"text"}).pipe(catchError(this.handleError))
  }

  unbanStudent(userId: number): Observable<any>{
    return this.httpClient.put(`${environment.apiUrl}/user/unbanUser/${userId}`, null,{headers: this.headers,responseType:"text"}).pipe(catchError(this.handleError))

  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      msg = error.error.message;
    } else {
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
