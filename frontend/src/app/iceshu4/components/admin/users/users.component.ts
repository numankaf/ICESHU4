import { Component } from '@angular/core';
import {UsersService} from "./users.service";
import {ConfirmationService, LazyLoadEvent} from "primeng/api";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Department} from "../../../auth/register/department";
import {Role} from "./role";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  allUsers: any;
  allUsersSize: any;
  updateDialog: any;
  createDialog: any;
  updateUserByAdmin: FormGroup;
  form: FormGroup;
  departments!: Department[];
  roles! : Role[];

  constructor(private userService: UsersService,
              private confirmationService: ConfirmationService,
              private router: Router, private fb: FormBuilder,
              private http: HttpClient) {
    this.updateUserByAdmin = this.fb.group({
      id: [null, [Validators.required]],
      name: [null, [Validators.required]],
      surname: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      birth_date: [null, [Validators.required]],
      about: [null, [Validators.required]],
      address: [null, [Validators.required]],
      profile_photo: [null, [Validators.required]],

    });

    this.form = this.fb.group({
      name: [null, [Validators.required]],
      surname: [null, [Validators.required]],
      department: [null, [Validators.required]],
      role: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: [null, [Validators.required]],
      confirmpassword: [null, [Validators.required]]
    }, {
      validators: this.password.bind(this)
    });
  }

  ngOnInit(): void{
    this.loadUsers();

    this.http.get<any>(`${environment.apiUrl}/department/findAll`).subscribe(
      (data) =>{
        this.departments = data;
      }
    );

    this.http.get<any>(`${environment.apiUrl}/user/findUserRoles`).subscribe(
      (data) =>{
        this.roles = data;
      }
    );
    //get role
  }

  loadUsers(){
    this.userService.getAllUser().subscribe(
      response => {
        this.allUsersSize = response.length;
        this.allUsers = response;
      }
    )
  }

  deleteUser(id: number){
    this.confirmationService.confirm({
      header: "Confirmation",
      message: "Are you sure you want to delete?",
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService.deleteUser(id).subscribe(
          response => {
          },
          error => {
          }
        );
        location.reload();
      },
      reject: () => {
      }
    })
  }

  addUser() {
    const name = this.form.get('name')?.value;
    const surname = this.form.get('surname')?.value;
    const department = this.form.get('department')?.value;
    const role = this.form.get('role')?.value;
    const email = this.form.get('email')?.value;
    const password = this.form.get('password')?.value;
    const newData = {name, surname, email, department, role, password};
    console.log(newData)
    if (this.form.valid){

    }
  }

  openAddDialog(){
    this.createDialog = true;
  }

  closeAddDialog(){
    this.createDialog = false;
  }

  updateUser() {
      const id = this.updateUserByAdmin.get('id')?.value;
      const name = this.updateUserByAdmin.get('name')?.value;
      const surname = this.updateUserByAdmin.get('surname')?.value;
      const email = this.updateUserByAdmin.get('email')?.value;
      const birth_date = this.updateUserByAdmin.get('birth_date')?.value;
      const about = this.updateUserByAdmin.get('about')?.value;
      const address = this.updateUserByAdmin.get('address')?.value;
      const profile_photo = this.updateUserByAdmin.get('profile_photo')?.value;
      const newData = {name, surname, email, birth_date, about, address, profile_photo};
      this.userService.updateUser(1, newData).subscribe(
        response => {
          location.reload();
        }
      );
      this.updateDialog = false;
  }

  openUpdateDialog(allUsers: any){
    this.updateDialog = true;
    this.updateUserByAdmin.controls['id'].setValue(allUsers.id);
    this.updateUserByAdmin.controls['name'].setValue(allUsers.name);
    this.updateUserByAdmin.controls['surname'].setValue(allUsers.surname);
    this.updateUserByAdmin.controls['email'].setValue(allUsers.email);
    this.updateUserByAdmin.controls['birth_date'].setValue(allUsers.birth_date);
    this.updateUserByAdmin.controls['about'].setValue(allUsers.about);
    this.updateUserByAdmin.controls['address'].setValue(allUsers.address);
    this.updateUserByAdmin.controls['profile_photo'].setValue(allUsers.profile_photo);
  }

  closeUpdateDialog(){
    this.updateDialog = false;
  }

  get updateControls() {
    return this.updateUserByAdmin.controls;
  }

  get f() {
    return this.form.controls;
  }

  password(formGroup: FormGroup) {
    // @ts-ignore
    const { value: password } = formGroup.get('password');
    // @ts-ignore
    const { value: confirmPassword } = formGroup.get('confirmpassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }

}
