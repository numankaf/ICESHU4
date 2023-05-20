import {Component} from '@angular/core';
import {CourseService} from "./course.service";
import {AuthenticationService} from "../../core/authentication.service";
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent {
  courses: any;
  userData: any;
  menuOpen: boolean= false;

  constructor(private courseService: CourseService,
              private authenticationService: AuthenticationService) {
    this.userData = authenticationService.decodeToken(this.authenticationService.getToken() || "");

  }

  ngOnInit(): void {

    if (this.authenticationService.getRole() === 'DEPARTMENT_MANAGER') {
      this.courseService.getDepartmentCourses(this.userData.departmentId).subscribe(
        (data) => {
          this.courses = data;
        }
      )
    } else {
      this.courseService.getUserCoursesById(this.userData.sub).subscribe(
        (data) => {
          this.courses = data;
        }
      )
    }
  }


}
