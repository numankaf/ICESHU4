import { Component } from '@angular/core';
import {AuthenticationService} from "../../../core/authentication.service";
import {Router} from "@angular/router";
import {ReEvaluationService} from "./re-evaluation.service";
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'app-re-evaluation',
  templateUrl: './re-evaluation.component.html',
  styleUrls: ['./re-evaluation.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ReEvaluationComponent {
  reEvalRequest: any = [];

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private reEvaluationService: ReEvaluationService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,) {
  }

  ngOnInit(){
    this.reEvaluationService.findAllReEvaluationRequest().subscribe(
      response=>{
        this.reEvalRequest = response;
      }
    );

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
