import {Component} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {ActivatedRoute} from "@angular/router";
import {FormService} from "../form.service";
import {AuthenticationService} from "../../../core/authentication.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class CreateFormComponent {
  userData: any;
  questionType= "Open Ended";
  dateCurrent = new Date();
  addQuestion: boolean = false;
  addOption: boolean= false;
  commonQuestions = [{
    name: "The Instructor satisfactorily responded to questions",
    options: [{name: "Very Bad"}, {name: "Bad"}, {name: "Moderate"}, {name: "Good"}, {name: "Very Good"}]
  },
    {
      name: "Communication with the Instructor was adequate.",
      options: [{name: "Very Bad"}, {name: "Bad"}, {name: "Moderate"}, {name: "Good"}, {name: "Very Good"}]
    },
    {
      name: "The Instructor assessed course progress by questioning or using other appropriate means.",
      options: [{name: "Very Bad"}, {name: "Bad"}, {name: "Moderate"}, {name: "Good"}, {name: "Very Good"}]
    },
    {
      name: "The communication of information maintained my interest in the classroom or online",
      options: [{name: "Very Bad"}, {name: "Bad"}, {name: "Moderate"}, {name: "Good"}, {name: "Very Good"}]
    },
    {
      name: "The Instructor made clear the applications of the subject matter to my major, to other courses, or to my life",
      options: [{name: "Very Bad"}, {name: "Bad"}, {name: "Moderate"}, {name: "Good"}, {name: "Very Good"}]
    },
    {
      name: "The materials used to support assignments in the course (texts, readings, websites, etc.) were useful",
      options: [{name: "Very Bad"}, {name: "Bad"}, {name: "Moderate"}, {name: "Good"}, {name: "Very Good"}]
    },
    {
      name: "What has been the best aspect of this course?",
      options: [{name: ""}]
    },
    {
      name: "Would you change anything about this course/instructor? If so, what would you change?",
      options: [{name: ""}]
    }
  ]

  survey: FormGroup;
  questionForm: FormGroup;
  optionForm: FormGroup;
  constructor(private route: ActivatedRoute,
              private formService: FormService,
              private messageService: MessageService,
              private formBuilder: FormBuilder,
              private confirmationService: ConfirmationService,
              private authenticationService: AuthenticationService) {

    this.userData = authenticationService.decodeToken(this.authenticationService.getToken() || "");
    this.survey = this.formBuilder.group({
      name: new FormControl(null, [Validators.required]),
      startDate: new FormControl(null, [Validators.required]),
      endDate: new FormControl(null, [Validators.required]),
      questions: new FormControl([], []),
    });
    this.questionForm = this.formBuilder.group({
      questionText: new FormControl(null, [Validators.required]),
      options: new FormControl([' '], []),
    })
    this.optionForm = this.formBuilder.group({
      option: new FormControl(null, [Validators.required]),
    })
  }

  ngOnInit(): void {

  }

  createSurvey() {

  }

  createQuestion(){
    this.survey.value['questions'].push(this.questionForm.value);
    this.addQuestion = false;

  }

  createOption(){
    this.questionForm.value['options'].push({option:this.optionForm.value['option']});
    this.addOption = false;
    this.optionForm.reset();

  }
  resetForms(){
    this.questionType= "Open Ended";
    this.addOption = false;
    this.optionForm.reset();
    this.questionForm.reset();
    this.questionForm.controls['options'].setValue([' ']);
    let questions = this.survey.value["questions"];
    this.survey.reset();
    this.survey.controls['questions'].setValue(questions);
  }
}
