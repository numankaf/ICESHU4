import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {environment} from "../../../../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({
    responseType: 'text'
  }),
};

@Injectable({
  providedIn: 'root'
})

export class UsersService{
  constructor(private httpClient: HttpClient) {
  }

  getAllUser(): Observable<any>{
    return this.httpClient.get(`${environment.apiUrl}/user/findAll`).pipe(catchError(this.handleError))
  }

  deleteUser(id: number): Observable<any>{
    return this.httpClient.delete(`${environment.apiUrl}/user/delete/${id}`).pipe(catchError(this.handleError))
  }

  updateUser(id: number, data: any): Observable<any>{
    // @ts-ignore
    return this.httpClient.put(`${environment.apiUrl}/user/update/${id}`, data, {headers: this.headers,responseType:"text"}).pipe(catchError(this.handleError),);

  }

  addUserByAdmin(data: any): Observable<any>{
    return this.httpClient.post(`${environment.apiUrl}/user/update/${id}`,data)
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
