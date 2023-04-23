import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../core/authentication.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {Message} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  clickedButton = false;
  errorMessages: Message[] =[];
  form = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  constructor(private authenticationService: AuthenticationService,
              private router: Router) {

  }

  get f() {
    return this.form.controls;
  }

  login(){
    if(this.form.valid){
      this.authenticationService.login(this.form.value).subscribe(
        (res:any)=>{
          sessionStorage.setItem('accessToken', res.accessToken);
          this.router.navigate(['main']);
        },
      error=>{
          this.errorMessages=[];
          this.errorMessages.push({
            severity: 'error',
            summary: 'Error:',
            detail: 'Username or password is wrong'
          })
      }
      )
    }
    else{
      return;
    }
  }
}
