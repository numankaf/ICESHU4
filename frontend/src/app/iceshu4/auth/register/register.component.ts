import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Department} from "./department";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../core/authentication.service";
import {Message} from "primeng/api";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form: FormGroup;
  selectedDepartment?: Department;
  departments!: Department[];
  errorMessages: Message[] =[];
  constructor(private router: Router, private authenticationService: AuthenticationService,
              private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      surname: [null, [Validators.required]],
      department: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirmpassword: [null, [Validators.required]]
    }, {
      validators: this.password.bind(this)
    });
  }

  ngOnInit() {
    this.departments = [
      {id: 1, departmentName: "Computer Engineering"},
      {id: 2, departmentName: "Electric Electronic Engineering"},
      {id: 3, departmentName: "Mechanical Engineering "}
    ]
  }
  password(formGroup: FormGroup) {
    // @ts-ignore
    const { value: password } = formGroup.get('password');
    // @ts-ignore
    const { value: confirmPassword } = formGroup.get('confirmpassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }
  get f() {
    return this.form.controls;
  }

  register() {
    if(this.form.valid){
      this.authenticationService.signup(this.form.value).subscribe(
        (res:any)=>{
          sessionStorage.setItem('accessToken', res.accessToken);
          this.router.navigate(['main']);
        },
        error=>{
          this.errorMessages=[];
          this.errorMessages.push({
            severity: 'error',
            summary: 'Error:',
            detail: 'This email is already in use!'
          })
        }
      )
    }
    else{
      return;
    }
  }

}
