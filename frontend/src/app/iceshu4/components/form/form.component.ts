import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {FormService} from "./form.service";
import {AuthenticationService} from "../../core/authentication.service";
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class FormComponent {

  forms: any = [];
  userData: any;

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private formService: FormService) {
    this.userData = authenticationService.decodeToken(this.authenticationService.getToken() || "");
  }

  ngOnInit(): void {
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

  goToCreate() {
    this.router.navigate([this.router.url, 'createform']);
  }

  getNumberOfDays(end: any) {
    const date1 = new Date();
    const date2 = new Date(end);
    const oneDay = 1000 * 60 * 60 * 24;
    const diffInTime = date2.getTime() - date1.getTime();
    const diffInDays = Math.round(diffInTime / oneDay);
    return diffInDays;
  }

  getStatus(form: any){
    if(form.published){
      if(this.authenticationService.getRole() == 'STUDENT'){
        if(this.getNumberOfDays(form.endDate)<=0){
          return {text:"ENDED", severity:"danger"};
        }
        return {text:"INCOMPLETE", severity:"warning"};
      }else{
        return {text:"PUBLISHED", severity:"success"};
      }
    }
    else{
      return {text:"NOT PUBLISHED", severity:"warning"};
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

  publish(id: any){
    console.log(id)
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

  delete(id: any){
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

}
