import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(private httpClient: HttpClient) {
  }

  getStudentFilledFormsStatus(studentId: any): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/surveyanswer/get/formstatus/${studentId}`).pipe(catchError(this.handleError));
  }

  getSurveyAnswer(studentId: any, surveyId: any): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/surveyanswer/get/${studentId}/${surveyId}`).pipe(catchError(this.handleError));
  }

  updateSurveyAnswer(surveyAnswer: any): Observable<any> {
    // @ts-ignore
    return this.httpClient.put<any>(`${environment.apiUrl}/surveyanswer/doItLater`, surveyAnswer, {responseType: "text"}).pipe(catchError(this.handleError));
  }
  submitSurveyAnswer(surveyAnswer: any): Observable<any> {
    // @ts-ignore
    return this.httpClient.put<any>(`${environment.apiUrl}/surveyanswer/submit`, surveyAnswer, {responseType: "text"}).pipe(catchError(this.handleError));
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
