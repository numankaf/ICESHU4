import { Component } from '@angular/core';
import {UsersService} from "./users.service";
import {ConfirmationService, LazyLoadEvent, Message} from "primeng/api";
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
  errorMessages: Message[] =[];

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
      department: [null],
      role: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: [null, [Validators.required]],
    },);
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
        this.roles=data;
      }
    );
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
    if (this.form.valid){
      this.userService.addUserByAdmin(this.form.value).subscribe(
        response =>{
          this.createDialog = false;
          location.reload();
        },
        error => {
          this.errorMessages=[];
          this.errorMessages.push({
            severity: 'error',
            summary: 'Error:',
            detail: 'This email is already in use!'
          })
        }
      );
    }
    else{
      return;
    }
  }

  openAddDialog(){
    this.form.reset();
    this.createDialog = true;

  }

  closeAddDialog(){
    this.createDialog = false;
    this.form.reset();
  }

  updateUser() {
      const id = this.updateUserByAdmin.get('id')?.value;
      this.userService.updateUser(id, this.updateUserByAdmin.value).subscribe(
        response => {
          location.reload();
        },
        error => {
          console.log(error);
        }
      );
      this.updateDialog = false;
  }

  openUpdateDialog(allUsers: any){
    this.updateDialog = true;
    this.updateUserByAdmin.patchValue(allUsers);
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

}
