import { Component } from '@angular/core';
import {BanStudentsService} from "./ban-students.service";
import {HttpClient} from "@angular/common/http";
import {ConfirmationService, MessageService} from "primeng/api";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-ban-students',
  templateUrl: './ban-students.component.html',
  styleUrls: ['./ban-students.component.scss'],
  providers: [MessageService]
})
export class BanStudentsComponent {
  students : any;
  constructor(private banStudentsService: BanStudentsService,
              private http: HttpClient,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    this.banStudentsService.getStudents().subscribe(
      response => {
        this.students = response;
      },error => {
    }
    )
  }

  banUser(user: any) {
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Would you like to restrict some features of ' + user.name + ' ' + user.surname + ' ?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        //this.banStudentsService.banStudent(user.id);
        this.ngOnInit();
        this.messageService.add({ severity: 'success', summary: 'Banned', detail: user.name + ' ' + user.surname + ' banned.' });
      },
      reject: () => {
      }
    });
  }
}
