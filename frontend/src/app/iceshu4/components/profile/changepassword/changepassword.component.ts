import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Message, MessageService} from "primeng/api";
import {AccountService} from "../account/account.service";

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  providers:[MessageService]
})
export class ChangepasswordComponent {
  form: FormGroup;
  constructor( private formBuilder: FormBuilder, private accountService: AccountService,
               private messageService:MessageService) {
    this.form = this.formBuilder.group({

      currentPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required]],
      confirmpassword: [null, [Validators.required]]
    }, {
      validators: this.password.bind(this)
    });
  }




  changepassword(){
    if(this.form.valid){
      this.accountService.changepassword(this.form.value).subscribe(
        (res:any)=>{
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Password changed' });
        },
        error=>{
          this.messageService.add({severity: 'error',
            summary: 'Error:',
            detail: 'Please enter your current password correctly!' });
        }
      )
    }
    else{
      return;
    }
  }
  password(formGroup: FormGroup) {
    // @ts-ignore
    const { value: password } = formGroup.get('newPassword');
    // @ts-ignore
    const { value: confirmPassword } = formGroup.get('confirmpassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }

  get f() {
    return this.form.controls;
  }
}
