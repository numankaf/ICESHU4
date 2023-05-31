import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private httpClient: HttpClient) {
  }
  findAll(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/survey/findAll`).pipe(catchError(this.handleError));
  }

  createSurvey(courseId: any, form:any): Observable<any> {
    // @ts-ignore
    return this.httpClient.post<any>(`${environment.apiUrl}/survey/create/${courseId}`, form, {responseType: "text"}).pipe(catchError(this.handleError));
  }
  findAllSurveysOfUser(userId: any): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/survey/findAll/${userId}`).pipe(catchError(this.handleError));
  }

  findAllSubmittedSurveyAnswers(surveyId: any): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/survey/findAllSurveyAnswers/${surveyId}`).pipe(catchError(this.handleError));
  }

  findAllSurveysOfCourses(courseId: any): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/survey/findAllByCourseID/${courseId}`).pipe(catchError(this.handleError));
  }
  findAllByCourseIDForStudent(courseId: any): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/survey/findAllByCourseIDForStudent/${courseId}`).pipe(catchError(this.handleError));
  }

  getSurveyById(id: any): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/survey/get/${id}`).pipe(catchError(this.handleError));
  }

  deleteSurvey(id: any): Observable<any> {
    // @ts-ignore
    return this.httpClient.delete<any>(`${environment.apiUrl}/survey/delete/${id}`, {responseType: 'text'}).pipe(catchError(this.handleError));
  }

  addQuestion(surveyId: any, question: any): Observable<any> {
    // @ts-ignore
    return this.httpClient.put<any>(`${environment.apiUrl}/survey/update/addQuestion/${surveyId}`,question,{responseType: 'text'}).pipe(catchError(this.handleError));
  }

  deleteQuestion(surveyId: any, questionId: any): Observable<any> {
    // @ts-ignore
    return this.httpClient.put<any>(`${environment.apiUrl}/survey/update/deleteQuestion/${surveyId}/${questionId}`,{},{responseType: 'text'}).pipe(catchError(this.handleError));
  }

  publishSurvey(surveyId: any): Observable<any> {
    // @ts-ignore
    return this.httpClient.post<any>(`${environment.apiUrl}/survey/publish/${surveyId}`, {},{responseType: 'text'}).pipe(catchError(this.handleError));
  }

  getStatistics(formId: any): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/survey/getStatistics/${formId}`).pipe(catchError(this.handleError));
  }

  createReEvalutaionRequest(reEvalDto: any): Observable<any>{
    // @ts-ignore
    return this.httpClient.post<any>(`${environment.apiUrl}/reevaluation/create`, reEvalDto,{responseType:"text"}).pipe(catchError(this.handleError));
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
