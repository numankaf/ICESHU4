import {Component} from '@angular/core';
import {CourseService} from "./course.service";
import {AuthenticationService} from "../../core/authentication.service";
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";
import {Router} from "@angular/router";


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class CourseComponent {

  colorCombinations =[
    {c:"var(--blue-400)" , bg:"var(--blue-500)"},
    {c:"var(--red-400)" , bg:"var(--red-500)"},
    {c:"var(--green-400)" , bg:"var(--green-500)"},
    {c:"var(--yellow-400)" , bg:"var(--yellow-500)"},
    {c:"var(--cyan-400)" , bg:"var(--cyan-500)"},
    {c:"var(--pink-400)" , bg:"var(--pink-500)"},
    {c:"var(--indigo-400)" , bg:"var(--indigo-500)"},
    {c:"var(--teal-400)" , bg:"var(--teal-500)"},
    {c:"var(--orange-400)" , bg:"var(--orange-500)"},
    {c:"var(--bluegray-400)" , bg:"var(--bluegray-500)"},
    {c:"var(--purple-400)" , bg:"var(--purple-500)"},
    {c:"var(--gray-400)" , bg:"var(--gray-500)"}
  ];


  courses: any;
  departmentAllCourses: any;
  userData: any;
  dropPopup: boolean= false;
  enrollDialog: boolean= false;
  selectedCourse: any;

  constructor(private courseService: CourseService,
              private router: Router,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private authenticationService: AuthenticationService) {

    this.userData = authenticationService.decodeToken(this.authenticationService.getToken() || "");
    if(this.authenticationService.getRole()=== "STUDENT"){
      this.courseService.getDepartmentCourses(this.userData.departmentId).subscribe(
        (data)=>{
          this.departmentAllCourses =data;
        }
      )
    }
  }

  ngOnInit(): void {

    if (this.authenticationService.getRole() === 'DEPARTMENT_MANAGER') {
      this.courseService.getDepartmentCourses(this.userData.departmentId).subscribe(
        (data) => {
          this.courses = data;
        }
      )
    }
    else if (this.authenticationService.getRole() === 'ADMIN') {
      this.courseService.findAll().subscribe(
        (data) => {
          this.courses = data;
        }
      )
    }
    else {
      this.courseService.getUserCoursesById(this.userData.sub).subscribe(
        (data) => {
          this.courses = data;
        }
      )
    }
  }

  enroll(){
    this.courseService.enroll(this.userData.sub, this.selectedCourse.id).subscribe(
      (data)=>{
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Succesfully Enrolled'});
        this.ngOnInit();
        this.enrollDialog =false
        this.selectedCourse = null;
        },
      (error)=>{
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Enroll failed'});
        this.enrollDialog =false;
        this.selectedCourse = null;
      }
    )
  }

  goToDetail(id:any){
    this.router.navigate([this.router.url, id]);
  }
  filterCourse(event:any) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < this.departmentAllCourses.length; i++) {
      let course = this.departmentAllCourses[i];
      if (course.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(course);
      }
    }

    this.departmentAllCourses = filtered;
  }

  confirmDrop(id: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to drop this course?',
      header: 'Drop Course',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log("Dropping  "+id)
      },
      key:"dropDialog"
    });
  }
  confirmDelete(id: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this course?',
      header: 'Delete Course',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log("Deleting  "+id)
      },
      key:"deleteDialog"
    });
  }

}
