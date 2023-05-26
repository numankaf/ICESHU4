import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {environment} from "../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class DetailMessageService{

  headers = new HttpHeaders({ 'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*' ,
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    'Access-Control-Expose-Headers' : 'Content-Disposition',
    "Access-Control-Max-Age": "86400"});
  constructor(private httpClient: HttpClient) {
  }

  getMessageById(id: any): Observable<any>{
    return this.httpClient.get<any>(`${environment.apiUrl}/message/find/${id}`).pipe(catchError(this.handleError))
  }

  getMessagesOwner(id: any): Observable<any>{
    return this.httpClient.get<any>(`${environment.apiUrl}/user/get/${id}`).pipe(catchError(this.handleError))
  }

  answerStudent(data: any): Observable<any>{
    return this.httpClient.put(`${environment.apiUrl}/message/responseMessage`,data,{headers: this.headers,responseType:"text"}).pipe(catchError(this.handleError))
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
