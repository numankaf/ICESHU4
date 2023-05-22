import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private httpClient: HttpClient) {
  }

  // getUserCourses(): Observable<any> {
  //   return this.httpClient.get(`${environment.apiUrl}/course/getUserCourses`).pipe(catchError(this.handleError));
  // }

  getUserCoursesById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/course/getUserCourses/${id}`).pipe(catchError(this.handleError));
  }

  findAll(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/course/findAll`).pipe(catchError(this.handleError));
  }

  getById(id: string | null): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/course/get/${id}`).pipe(catchError(this.handleError));
  }


  getDepartmentCourses(id: number): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/course/getDepartmentCourses/${id}`).pipe(catchError(this.handleError));
  }

  getSemesterCourses(id: number): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/course/getSemesterCourses/${id}`).pipe(catchError(this.handleError));
  }

  findCourseStudents(id: string | null): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/user/findCourseStudents/${id}`).pipe(catchError(this.handleError));
  }

  findCourseInstructors(id: string | null): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/user/findCourseInstructors/${id}`).pipe(catchError(this.handleError));
  }

  create(data: any): Observable<any> {
    // @ts-ignore
    return this.httpClient.post<any>(`${environment.apiUrl}/course/create}`, data, {responseType: 'text'}).pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<any> {
    // @ts-ignore
    return this.httpClient.delete<any>(`${environment.apiUrl}/course/delete/${id}`, {responseType: 'text'}).pipe(catchError(this.handleError));
  }
  enroll(userId:any, courseId: any):Observable<any>{
    // @ts-ignore
    return this.httpClient.post<any>(`${environment.apiUrl}/user/enrollCourse/${userId}/${courseId}`,null, {responseType: 'text'}).pipe(catchError(this.handleError));
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
