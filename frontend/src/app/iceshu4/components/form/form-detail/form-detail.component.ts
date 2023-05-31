import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {FormService} from "../form.service";
import {AnswerService} from "../answer.service";
import {AuthenticationService} from "../../../core/authentication.service";

@Component({
  selector: 'app-form-detail',
  templateUrl: './form-detail.component.html',
  styleUrls: ['./form-detail.component.scss'],
})
export class FormDetailComponent {
  survey: any;
  surveyId: any;
  userData: any;
  formAnswers: any;
  surveyAnswer: any;
  showAnswers:boolean= false;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private formService: FormService,
              private answerService: AnswerService,
              private authenticationService: AuthenticationService) {
    this.surveyId = this.route.snapshot.paramMap.get('id');
    this.userData = authenticationService.decodeToken(this.authenticationService.getToken() || "");

  }

  ngOnInit(): void {
    this.formService.findAllSubmittedSurveyAnswers(this.surveyId).subscribe((data)=>{
      this.formAnswers = data;
    })
    this.formService.getSurveyById(this.surveyId).subscribe((data)=>{
      this.survey = data;
    })
  }

  openAnswers(index:any){
    this.surveyAnswer = this.formAnswers[index];
    this.showAnswers = !this.showAnswers;
  }
}
