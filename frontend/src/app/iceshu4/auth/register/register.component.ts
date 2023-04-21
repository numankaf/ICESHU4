import { Component } from '@angular/core';
import {Register} from "./register";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Department} from "./department";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerInfos: Register = new Register();

  form = new FormGroup({
    department: new FormControl(this.registerInfos.departmentId, [Validators.required]),
    name: new FormControl(this.registerInfos.name, [Validators.required]),
    surname: new FormControl(this.registerInfos.surname, [Validators.required]),
    email: new FormControl(this.registerInfos.email, [Validators.required]),
    password: new FormControl(this.registerInfos.password, [Validators.required]),
  });

  selectedDepartment?: Department;
  departments!: Department[];

  ngOnInit(){
    this.departments = [
      { id: 1, departmentName: "Computer Science" },
      { id: 2, departmentName: "Electric Electronic Engineering" },
      { id: 3, departmentName: "Mechanical Engineering "}
    ]
  }




  get f() {
    return this.form.controls;
  }

  register(){
    console.log(this.form.value);
  }

}
