import {Component, Input} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../core/authentication.service";
import {FormService} from "../form.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { AnswerService } from '../answer.service';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class FormListComponent {
  @Input() courseId = 0;
  forms: any = [];
  userData: any;
  reEvaluateForm: FormGroup;
  formStatus: any;

  constructor(private router: Router,
              private answerService: AnswerService,
              private authenticationService: AuthenticationService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private formService: FormService,
              private fb: FormBuilder) {
    this.userData = authenticationService.decodeToken(this.authenticationService.getToken() || "");
    this.reEvaluateForm = this.fb.group({
      survey: [null, Validators.required],
      content: [null, [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.answerService.getStudentFilledFormsStatus(this.userData.sub).subscribe(
      (data)=>{
        this.formStatus = data;
      }
    )
    if (this.courseId !== 0) {
      if (this.authenticationService.getRole() === 'STUDENT') {
        this.formService.findAllByCourseIDForStudent(this.courseId).subscribe((data) => {
          this.forms = data;
        })
      } else {
        this.formService.findAllSurveysOfCourses(this.courseId).subscribe((data) => {
          this.forms = data;
        })
      }
    } else {
      if (this.authenticationService.getRole() === 'ADMIN') {
        this.formService.findAll().subscribe((data) => {
          this.forms = data;
        })
      } else {
        this.formService.findAllSurveysOfUser(this.userData.sub).subscribe((data) => {
          this.forms = data;
        })
      }
    }
  }

  goToCreate() {
    this.router.navigate([this.router.url, 'createform']);
  }

  goToFill(id: any) {
    const routeLink = id + '/fill'
    this.router.navigate(['student/forms/' + routeLink]);
  }

  goToEdit(id: any) {
    if (this.authenticationService.getRole() === "ADMIN") {
      this.router.navigate(['admin/forms/' + id + '/edit']);
    } else if (this.authenticationService.getRole() === "DEPARTMENT_MANAGER") {
      this.router.navigate(['departmentmanager/forms/' + id + '/edit']);
    } else if (this.authenticationService.getRole() === "INSTRUCTOR") {
      this.router.navigate(['instructor/forms/' + id + '/edit']);
    } else {
      this.router.navigate(['student/forms/' + id + '/edit']);
    }
  }

  getNumberOfDays(end: any) {
    const date1 = new Date();
    const date2 = new Date(end);
    const oneDay = 1000 * 60 * 60 * 24;
    const diffInTime = date2.getTime() - date1.getTime();
    const diffInDays = Math.round(diffInTime / oneDay);
    return diffInDays;
  }

  getStatus(form: any) {
    if (form.published) {
      if (this.authenticationService.getRole() == 'STUDENT') {
        if (this.getNumberOfDays(form.endDate) <= 0) {
          return {text: "ENDED", severity: "danger"};
        } else if (this.formStatus[form.id] == true) {
          return {text: "COMPLETED", severity: "success"};
        } else {
          return {text: "INCOMPLETE", severity: "warning"};
        }

      } else {
        return {text: "PUBLISHED", severity: "success"};
      }
    } else {
      return {text: "NOT PUBLISHED", severity: "warning"};
    }
  }

  confirmPublish(id: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to publish this form?',
      header: 'Publish Form',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.publish(id);
      },
      key: "publishDialog"
    });
  }

  publish(id: any) {
    this.formService.publishSurvey(id).subscribe(
      (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'You published the form successfully'
        });
        this.ngOnInit();
      },
      (error) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Form Publish failed'});
      }
    )
  }

  confirmDelete(id: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this form?',
      header: 'Publish Form',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.delete(id);
      },
      key: "deleteDialog"
    });
  }

  delete(id: any) {
    this.formService.deleteSurvey(id).subscribe(
      (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'You deleted the form successfully'
        });
        this.ngOnInit();
      },
      (error) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Form deletion failed'});
      }
    )
  }

  reEvalRequestDialog: boolean = false;
  get f() {
    return this.reEvaluateForm.controls;
  }
  openReEvalRequest(form: any){
    this.reEvaluateForm.reset()
    this.reEvalRequestDialog = true;
    this.reEvaluateForm.get('survey')?.patchValue(form);
  }
  createReEvalRequest() {
    if (this.reEvaluateForm.valid){
      console.log(this.reEvaluateForm.value);
      this.formService.createReEvalutaionRequest(this.reEvaluateForm.value).subscribe(
        response =>{
          this.reEvalRequestDialog = false;
          this.ngOnInit();
          this.messageService.add({ severity: 'success', summary: 'Re-Evaluation', detail: 'Re-Evaluation request sended.' });
        },error=>{
          console.log(error)
          this.messageService.add({ severity: 'error', summary: 'Re-Evaluation', detail: 'Error occurred while re-evaluation request sending.' });
        }
      )
    }
    else{
      return;
    }
  }
}
