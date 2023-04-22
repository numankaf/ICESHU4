import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent {
  form = new FormGroup({
    email: new FormControl(null, [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  sendResetPassword(){
    console.log(this.form.value);
  }
}
