import {Component} from '@angular/core';
import {CourseService} from "./course.service";
import {AuthenticationService} from "../../core/authentication.service";
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SemesterService} from "../admin/semesters/semester.service";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class CourseComponent {

  colorCombinations = [
    {c: "var(--blue-400)", bg: "var(--blue-500)"},
    {c: "var(--red-400)", bg: "var(--red-500)"},
    {c: "var(--green-400)", bg: "var(--green-500)"},
    {c: "var(--yellow-400)", bg: "var(--yellow-500)"},
    {c: "var(--cyan-400)", bg: "var(--cyan-500)"},
    {c: "var(--pink-400)", bg: "var(--pink-500)"},
    {c: "var(--indigo-400)", bg: "var(--indigo-500)"},
    {c: "var(--teal-400)", bg: "var(--teal-500)"},
    {c: "var(--orange-400)", bg: "var(--orange-500)"},
    {c: "var(--bluegray-400)", bg: "var(--bluegray-500)"},
    {c: "var(--purple-400)", bg: "var(--purple-500)"},
    {c: "var(--gray-400)", bg: "var(--gray-500)"}
  ];


  courses: any;
  semesters: any;
  curDepartment: any;
  departments: any;
  instructors: any;
  enrollableCourses:any;
  filteredEnrollableCourses:any;
  userData: any;
  dropPopup: boolean = false;
  enrollDialog: boolean = false;
  createDialog: boolean = false;
  selectedCourse: any;
  createForm: FormGroup;

  constructor(private courseService: CourseService,
              private semesterService: SemesterService,
              private router: Router,
              private http: HttpClient,
              private messageService: MessageService,
              private formBuilder: FormBuilder,
              private confirmationService: ConfirmationService,
              private authenticationService: AuthenticationService) {
    this.createForm = this.formBuilder.group({
      name: new FormControl(null, [Validators.required]),
      semester: new FormControl(null, [Validators.required]),
      department: new FormControl(null),
      users: new FormControl(null, Validators.required)
    })
    this.userData = authenticationService.decodeToken(this.authenticationService.getToken() || "");
    if (this.authenticationService.getRole() === "STUDENT") {
      this.courseService.getEnrollableCourses(this.userData.sub).subscribe(
        (data) => {
          this.enrollableCourses = data;
        }
      )
    }
  }


  ngOnInit(): void {

    if (this.authenticationService.getRole() === 'DEPARTMENT_MANAGER') {
      this.http.get<any>(`${environment.apiUrl}/department/get/${this.userData.departmentId}`).subscribe(
        (data) => {
          this.curDepartment = data;
        }
      );
      this.courseService.getDepartmentCourses(this.userData.departmentId).subscribe(
        (data) => {
          this.courses = data;
        }
      )
      this.courseService.getInstructorsByDepartmentId(this.userData.departmentId).subscribe(
        (data) => {
          this.instructors = data;
        }
      );
      this.semesterService.getAll().subscribe(
        (data) => {
          this.semesters = data;
        }
      )
    } else if (this.authenticationService.getRole() === 'ADMIN') {
      this.courseService.findAll().subscribe(
        (data) => {
          this.courses = data;
        }
      )
      this.http.get<any>(`${environment.apiUrl}/department/findAll`).subscribe(
        (data) => {
          this.departments = data;
        }
      );
    } else {
      this.courseService.getUserCoursesById(this.userData.sub).subscribe(
        (data) => {
          this.courses = data;
        }
      )
    }
  }

  createCourse() {

    this.createForm.controls['department'].setValue(this.curDepartment);

    if (this.createForm.invalid) {
      return
    }
    this.courseService.create(this.createForm.value).subscribe(
      (data)=>{
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Succesfully created a new course'});
        this.ngOnInit();
        this.createDialog = false
        this.createForm.reset();
      },
      (error) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Course create failed'});
        this.createDialog = false;
      }
    );
    this.createDialog = false;


  }

  enroll() {
    this.courseService.enroll(this.userData.sub, this.selectedCourse.id).subscribe(
      (data) => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Succesfully Enrolled'});
        this.ngOnInit();
        this.enrollDialog = false
        this.selectedCourse = null;
      },
      (error) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Enroll failed'});
        this.enrollDialog = false;
        this.selectedCourse = null;
      }
    )
  }


  goToDetail(id: any) {
    this.router.navigate([this.router.url, id]);
  }

  filterCourse(event: any) {
    let query = event.query;
    this.filteredEnrollableCourses = this.enrollableCourses.filter((data: any) =>  JSON.stringify(data).toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }

  drop(courseId: any) {
    this.courseService.drop(this.userData.sub, courseId).subscribe(
      (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'You dropped the course successfully'
        });
        this.ngOnInit();
      },
      (error) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Drop failed'});
      }
    )
  }

  delete(courseId: any) {
    this.courseService.delete(courseId).subscribe(
      (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'You deleted the course successfully'
        });
        this.ngOnInit();
      },
      (error) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Deletion failed'});
      }
    )
  }

  confirmDrop(id: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to drop this course?',
      header: 'Drop Course',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.drop(id);
      },
      key: "dropDialog"
    });
  }

  confirmDelete(id: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this course?',
      header: 'Delete Course',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.delete(id);
      },
      key: "deleteDialog"
    });
  }

}
