import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../core/authentication.service";
import {Message} from "primeng/api";

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent {
  errorMessages: Message[] = [];
  passwordSent: boolean = false;

  constructor(private authenticationService: AuthenticationService) {

  }

  form = new FormGroup({
    email: new FormControl(null, [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  sendResetPassword() {
    this.authenticationService.forgotPassword(this.form.value).subscribe(
      (res:any)=>{
        this.passwordSent = true ;
      },
      error=>{
        console.log(error)
        this.errorMessages=[];
        this.errorMessages.push({
          severity: 'error',
          summary: 'Error:',
          detail: 'This email does not exist'
        })
      }
    )
  }
}
