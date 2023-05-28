import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {FormService} from "../form.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {AuthenticationService} from "../../../core/authentication.service";
import {AnswerService} from "../answer.service";
import {SurveyAnswer} from "./SurveyAnswer";

@Component({
  selector: 'app-fill-form',
  templateUrl: './fill-form.component.html',
  styleUrls: ['./fill-form.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class FillFormComponent {
  surveyId: any;
  userData: any;
  selOption: any;
  surveyAnswer!: SurveyAnswer;
  survey:any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private formService: FormService,
              private answerService: AnswerService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private authenticationService: AuthenticationService) {
    this.surveyId = this.route.snapshot.paramMap.get('id');
    this.userData = authenticationService.decodeToken(this.authenticationService.getToken() || "");

  }

  ngOnInit(): void {
    this.formService.getSurveyById(this.surveyId).subscribe((data) => {
      this.survey = data;
    })
    this.answerService.getSurveyAnswer(this.userData.sub, this.surveyId).subscribe((data) => {
        this.surveyAnswer = data;
        this.setAnswers();
      })
  }

  setAnswers() {
    for (const answer of this.surveyAnswer.answers) {
      for (const question of this.survey.questions) {
        for (const option of question.options) {
          if (option.id == answer.optionId) {
            answer.answerText = option.content;
          }
        }
      }
    }
  }

  doItLater() {
    this.setAnswers();
    this.answerService.updateSurveyAnswer(this.surveyAnswer).subscribe((data)=>{
      this.router.navigate(['student/forms']);
    })


  }

  getNumberOfDays(end: any) {
    const date1 = new Date();
    const date2 = new Date(end);
    const oneDay = 1000 * 60 * 60 * 24;
    const diffInTime = date2.getTime() - date1.getTime();
    const diffInDays = Math.round(diffInTime / oneDay);
    return diffInDays;
  }

  submit() {
    this.setAnswers();
    this.answerService.submitSurveyAnswer(this.surveyAnswer).subscribe((data)=>{
      this.router.navigate(['student/forms']);
    })
  }
}
