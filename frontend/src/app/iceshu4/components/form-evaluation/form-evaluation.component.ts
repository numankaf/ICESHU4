import { Component } from '@angular/core';
import {AuthenticationService} from "../../core/authentication.service";
import {Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {FormEvalutaionService} from "./form-evalutaion.service";

@Component({
  selector: 'app-form-evaluation',
  templateUrl: './form-evaluation.component.html',
  styleUrls: ['./form-evaluation.component.scss'],
  providers: [MessageService]
})
export class FormEvaluationComponent {
  reEvalRequest: any = [];

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private reEvaluationService: FormEvalutaionService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,) {
  }

  ngOnInit(){
    if (this.authenticationService.getRole() === 'DEPARTMENT_MANAGER'){
      this.reEvaluationService.findAllReEvaluationRequest().subscribe(
        response=>{
          this.reEvalRequest = response;
        }
      );
    }
    else if(this.authenticationService.getRole() === 'INSTRUCTOR'){
      let token = this.authenticationService.getToken() || "";
      const id = this.authenticationService.decodeToken(token)["sub"];
      this.reEvaluationService.findInstructionsReEvaluationRequest(id).subscribe(
        response=>{
          this.reEvalRequest = response;
        }
      )
    }
  }

  declineRequest(id: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that to decline re-evaluation request of this form?',
      header: 'Decline Re-Evaluation Request',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.decline(id);
      },
      key: "confirmDialog"
    });
  }

  decline(id: any){
    this.reEvaluationService.declinedReEvalRequest(id).subscribe(
      response => {
        this.messageService.add({severity: 'error', summary: 'Re-Evaluation', detail: 'Re-Evaluation Request declined.'});
        this.ngOnInit();
      },
      error => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error occurred while sending decline request!'});
      }
    )
  }

  acceptRequest(id: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that to accept re-evaluation request of this form?',
      header: 'Accept Re-Evaluation Request',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.accept(id);
      },
      key: "confirmDialog"
    });
  }

  accept(id: any){
    this.reEvaluationService.acceptedReEvalRequest(id).subscribe(
      response => {
        this.messageService.add({severity: 'success', summary: 'Re-Evaluation', detail: 'Re-Evaluation Request accepted.'});
        this.ngOnInit();
      },
      error => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error occurred while sending accept request!'});
      }
    );
  }

}
