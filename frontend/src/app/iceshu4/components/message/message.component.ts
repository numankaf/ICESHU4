import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {IcesMessageService} from "./message.service";
import {AuthenticationService} from "../../core/authentication.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  messages: any;
  messagesLen: any;
  form: FormGroup;
  styleOBJ = {'background-color': 'var(--surface-card)'}
  constructor(private router: Router, private icesMessageService: IcesMessageService,
              private authenticationService: AuthenticationService,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      subject: [null, [Validators.required]],
      content: [null, [Validators.required]],
    })
    //this.userData = authenticationService.decodeToken(this.authenticationService.getToken() || "");
  }


  ngOnInit(){
    if (this.authenticationService.getRole()=== "STUDENT"){
      this.icesMessageService.getStudentsMessages().subscribe(
        response=>{
          this.messages = response;
          this.messagesLen = response.length;
        }
      )

    }else if (this.authenticationService.getRole()=== "ADMIN"){
      this.icesMessageService.getAllMessagesByAdmin().subscribe(
        response => {
          this.messages = response;
          this.messagesLen = response.length;
        }
      )
    }


  }

  goChat(id:any){
    this.router.navigate([this.router.url, id]);
  }

  createMessageDialog: boolean = false;
  get f() {
    return this.form.controls;
  }

  createMessage() {
    if (this.form.valid){
      this.icesMessageService.createMessage(this.form.value).subscribe(
       response =>{
         this.ngOnInit();
         this.createMessageDialog = false;
         this.form.reset();
       }
      )
    }
  }
}
