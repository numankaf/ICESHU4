import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {DetailMessageService} from "./detail-message.service";
import {AuthenticationService} from "../../../core/authentication.service";

@Component({
  selector: 'app-detail-message',
  templateUrl: './detail-message.component.html',
  styleUrls: ['./detail-message.component.scss']
})
export class DetailMessageComponent {
  messageOwner: any;
  message: any;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private detailMessageService:DetailMessageService, private authenticationService: AuthenticationService,){
    this.form = this.formBuilder.group({
      id: [],
      admin_response: [null,[Validators.required]]
    })
  }

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    this.form.get('id')?.patchValue(id);
    this.detailMessageService.getMessageById(id).subscribe(
      response => {
        this.message = response;
        this.detailMessageService.getMessagesOwner(this.message.student_id).subscribe(
          response=>{
            this.messageOwner = response;
          }
        )
      }
    )
  }

  answer() {
    if (this.form.valid) {
      this.detailMessageService.answerStudent(this.form.value).subscribe(
        response =>{
          this.ngOnInit();
        }
      )
    }
    else{
      return;
    }

  }

  isAdmin(){
    return this.authenticationService.getRole()=== "ADMIN";
  }

  isStudent(){
    return this.authenticationService.getRole()=== "STUDENT";
  }
}
