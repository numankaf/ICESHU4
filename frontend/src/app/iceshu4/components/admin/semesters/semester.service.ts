import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {environment} from "../../../../../environments/environment";



@Injectable({
  providedIn: 'root'
})
export class SemesterService{
  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<any>{
    return this.httpClient.get(`${environment.apiUrl}/semester/findAll`).pipe(catchError(this.handleError));
  }
  save(data: any): Observable<any> {

    // @ts-ignore
    return this.httpClient.post<any>(`${environment.apiUrl}/semester/create`, data, {responseType: 'text'}).pipe(catchError(this.handleError),);
  }
  delete(id:any): Observable<any> {

    // @ts-ignore
    return this.httpClient.delete<any>(`${environment.apiUrl}/semester/delete/${id}`, {responseType: 'text'}).pipe(catchError(this.handleError),);
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
