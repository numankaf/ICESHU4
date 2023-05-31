import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class FormEvalutaionService{
  constructor(private httpClient: HttpClient) {
  }

  findAllReEvaluationRequest(): Observable<any>{
    return this.httpClient.get<any>(`${environment.apiUrl}/reevaluation/findAll`).pipe(catchError(this.handleError));
  }

  acceptedReEvalRequest(id: any): Observable<any>{
    console.log(`${environment.apiUrl}/reevaluation/accept/${id}`)
    return this.httpClient.put(`${environment.apiUrl}/reevaluation/accept/${id}`,{responseType: "text"}).pipe(catchError(this.handleError));
  }

  declinedReEvalRequest(id: any): Observable<any>{
    console.log(`${environment.apiUrl}/reevaluation/decline/${id}`)
    return this.httpClient.put(`${environment.apiUrl}/reevaluation/decline/${id}`,{responseType: "text"}).pipe(catchError(this.handleError));
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
