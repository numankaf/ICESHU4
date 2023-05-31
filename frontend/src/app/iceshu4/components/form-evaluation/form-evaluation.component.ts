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
      this.reEvalRequest = null;
    }


  }

  declineRequest(id: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that to decline re-evaluation request of this form?',
      header: 'Decline Re-Evaluation Request',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({severity: 'error', summary: 'Re-Evaluation', detail: 'Re-Evaluation Request declined.'});
        this.reEvaluationService.declinedReEvalRequest(id).subscribe(
          response => {
            this.ngOnInit();
          },
          error => {
          }
        )
      },
      key: "confirmDialog"
    });
  }

  acceptRequest(id: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that to accept re-evaluation request of this form?',
      header: 'Accept Re-Evaluation Request',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({severity: 'success', summary: 'Re-Evaluation', detail: 'Re-Evaluation Request accepted.'});
        this.reEvaluationService.acceptedReEvalRequest(id).subscribe(
          response => {
            this.ngOnInit();
          },
          error => {
          }
        )
      },
      key: "confirmDialog"
    });
  }

}
