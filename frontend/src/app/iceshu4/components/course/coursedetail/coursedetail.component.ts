import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CourseService} from "../course.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {AuthenticationService} from "../../../core/authentication.service";
import {FormService} from "../../form/form.service";

@Component({
  selector: 'app-coursedetail',
  templateUrl: './coursedetail.component.html',
  styleUrls: ['./coursedetail.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class CoursedetailComponent {

  course = {name: "Course", forms: [{name: "Form 1"}, {name: "Form 2"}]};
  forms = [];
  students: any;
  instructors: any;
  userData: any;
  currentCourseId: any;
  constructor(private route: ActivatedRoute,
              private router:Router,
              private courseService: CourseService,
              private formService: FormService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private authenticationService: AuthenticationService) {

    this.userData = authenticationService.decodeToken(this.authenticationService.getToken() || "");
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.currentCourseId = id;
    this.courseService.getById(id).subscribe((data) => {
      this.course = data;
    })
    if (this.authenticationService.getRole() !== 'STUDENT') {
      this.courseService.findCourseStudents(id).subscribe((data) => {
        this.students = data;
      })
    }
    this.courseService.findCourseInstructors(id).subscribe((data) => {
      this.instructors = data;
    })
    this.formService.findAllSurveysOfCourses(id).subscribe((data) => {
      this.forms = data;
    })
  }

  goToCreate() {
    this.router.navigate([this.router.url, 'createform']);
  }


}
