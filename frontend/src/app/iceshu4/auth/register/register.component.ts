import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Department} from "./department";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  form = new FormGroup({
    department: new FormControl(null, [Validators.required]),
    name: new FormControl(null, [Validators.required]),
    surname: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    confirmpassword: new FormControl(null, [Validators.required]),
  });

  selectedDepartment?: Department;
  departments!: Department[];

  ngOnInit(){
    this.departments = [
      { id: 1, departmentName: "Computer Engineering" },
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
