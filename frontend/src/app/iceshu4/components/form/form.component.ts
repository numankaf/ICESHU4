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

}
