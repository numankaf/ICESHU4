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
  stateOptions: any[] = [{label: 'All', value: true}, {label: 'Banned', value: false}];

  value: boolean = true;
  constructor(private banStudentsService: BanStudentsService,
              private http: HttpClient,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    if (this.value){
      this.banStudentsService.getStudents().subscribe(
        response => {
          this.students = response;
        }
      )
    }
    if (!this.value){
      this.banStudentsService.getUnbannedStudents().subscribe(
        response => {
          this.students = response;
        })
    }

  }

  banUser(user: any) {
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Would you like to restrict some features of ' + user.name + ' ' + user.surname + ' ?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.banStudentsService.banStudent(user.id).subscribe(
          response=>{
            this.ngOnInit();
            this.messageService.add({ severity: 'info', summary: 'Banned', detail: user.name + ' ' + user.surname + ' banned.' });
          }
        );

      },
      reject: () => {
      }
    });
  }

  unBanUser(user: any){
    this.confirmationService.confirm({
      header: "Remove Ban",
      message: 'Would you like to remove ' + user.name + ' ' + user.surname + '\'s ban? After this process, the user will have some features.',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.banStudentsService.unbanStudent(user.id).subscribe(
          response=>{
            this.ngOnInit();
            this.messageService.add({ severity: 'info', summary: 'Ban Removed', detail: user.name + ' ' + user.surname + '\s ban removed.' });
          }
        );

      },
      reject: () => {
      }
    })
  }
}
