import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "./account.service";
import {Observable} from "rxjs";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {AuthenticationService} from "../../../core/authentication.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
  form: FormGroup;
  selectedDate: Date = new Date(2001, 9, 31);
  editMode : boolean = true;
  userRole: String = "User Role";
  fullName: String = "Name Surname"
  id : number;
  constructor(private formBuilder: FormBuilder, private accountService: AccountService, private authenticationService: AuthenticationService) {
    let token = this.authenticationService.getToken() || "";
    this.decodeJwtToken(token);
    this.id = this.decodeJwtToken(token);
    this.form = this.formBuilder.group({
      name: [[Validators.required]],
      surname: [[Validators.required]],
      email: [[Validators.required]],
      school_id: [],
      department: [],
      birth_date: [],
      address: [],
      about: []
    })
  }

  ngOnInit(){

    this.accountService.getUser(this.id).subscribe(data =>{
        this.userRole = data.role;
        this.fullName = data.name + " " + data.surname;
        this.form.get('name')?.patchValue(data.name);
        this.form.get('surname')?.patchValue(data.surname);
        this.form.get('school_id')?.patchValue(data.school_id);
        this.form.get('department')?.patchValue(data.department.name);
        this.form.get('email')?.patchValue(data.email);
        this.form.get('birth_date')?.patchValue(data.birth_date);
        this.form.get('address')?.patchValue(data.address);
        this.form.get('about')?.patchValue(data.about);
    })
  }

  public decodeJwtToken(token: string): number {
    const decodedToken = this.authenticationService.decodeToken(token);
    return decodedToken.sub;
  }

  update(){
    if(this.form.valid){

      const name = this.form.get('name')?.value;
      const surname = this.form.get('surname')?.value;
      const email = this.form.get('email')?.value;
      const birth_date = this.form.get('birth_date')?.value;
      const address = this.form.get('address')?.value;
      const about = this.form.get('about')?.value;

      const newData = {name, surname, email, birth_date, address, about};

      this.accountService.putUser(this.id, newData).subscribe(
        response => {
          console.log(response)
        }
      );
      this.fullName = name + " " + surname;
    }
    else{
      return;
    }

  }

  get f() {
    return this.form.controls;
  }
}
