import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CourseService} from "../course.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {AuthenticationService} from "../../../core/authentication.service";

@Component({
  selector: 'app-coursedetail',
  templateUrl: './coursedetail.component.html',
  styleUrls: ['./coursedetail.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class CoursedetailComponent {

  course = {name: "Course" , forms:[{name:"Form 1"},{name:"Form 2"}]};
  forms=[{name:"Form 1"},{name:"Form 2"}];
  students:any;
  instructors:any;
  userData:any;

  constructor(private route: ActivatedRoute,
              private courseService: CourseService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private authenticationService: AuthenticationService) {

    this.userData = authenticationService.decodeToken(this.authenticationService.getToken() || "");
  }

  ngOnInit(): void{
    const id = this.route.snapshot.paramMap.get('id');
    this.courseService.getById(id).subscribe((data) => {
      this.course = data;
    })
    if(this.authenticationService.getRole() !=='STUDENT'){
      this.courseService.findCourseStudents(id).subscribe((data) => {
        this.students = data;
      })
    }
    this.courseService.findCourseInstructors(id).subscribe((data) => {
      this.instructors = data;
    })
  }

}
