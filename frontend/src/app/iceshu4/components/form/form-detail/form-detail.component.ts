import {Component} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {ActivatedRoute} from "@angular/router";
import {AuthenticationService} from "../../../core/authentication.service";
import {FormService} from "../form.service";

@Component({
  selector: 'app-form-detail',
  templateUrl: './form-detail.component.html',
  styleUrls: ['./form-detail.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class FormDetailComponent {
  userData: any;

  constructor(private route: ActivatedRoute,
              private formService: FormService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private authenticationService: AuthenticationService) {

    this.userData = authenticationService.decodeToken(this.authenticationService.getToken() || "");
  }

  ngOnInit(): void {

  }

}
