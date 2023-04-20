import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Login} from "./login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  clickedButton = false;
  loginInfos: Login = new Login();
  form = new FormGroup({
    email: new FormControl(this.loginInfos.email, [Validators.required]),
    password: new FormControl(this.loginInfos.password, [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  login(){
    console.log(this.loginInfos.email + " " + this.loginInfos.password +  " ile giriş yapıldı.")
  }
}
