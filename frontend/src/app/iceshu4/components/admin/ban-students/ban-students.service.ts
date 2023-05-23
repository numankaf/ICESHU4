import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {environment} from "../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class BanStudentsService{
  constructor(private httpClient : HttpClient) {
  }

  getStudents():Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/user/findAllByRole/0`).pipe(catchError(this.handleError))
  }

  banStudent(userId: number) : Observable<any> {
    return this.httpClient.put(`${environment.apiUrl}/user/ban/${userId}`,null).pipe(catchError(this.handleError))
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
