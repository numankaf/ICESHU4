import {Component} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
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
  selOption:any;
  questionType= "Open Ended";
  dateCurrent = new Date();
  addQuestion: boolean = false;
  addOption: boolean= false;
  commonQuestions = [{
    name: "The Instructor satisfactorily responded to questions",
    options: [{content: "Very Bad"}, {content: "Bad"}, {content: "Moderate"}, {content: "Good"}, {content: "Very Good"}]
  },
    {
      questionText: "Communication with the Instructor was adequate.",
      questionType: "Multiple Choice",
      options: [{content: "Very Bad"}, {content: "Bad"}, {content: "Moderate"}, {content: "Good"}, {content: "Very Good"}]
    },
    {
      questionText: "The Instructor assessed course progress by questioning or using other appropriate means.",
      questionType: "Multiple Choice",
      options: [{content: "Very Bad"}, {content: "Bad"}, {content: "Moderate"}, {content: "Good"}, {content: "Very Good"}]
    },
    {
      questionText: "The communication of information maintained my interest in the classroom or online",
      questionType: "Multiple Choice",
      options: [{content: "Very Bad"}, {content: "Bad"}, {content: "Moderate"}, {content: "Good"}, {content: "Very Good"}]
    },
    {
      questionText: "The Instructor made clear the applications of the subject matter to my major, to other courses, or to my life",
      questionType: "Multiple Choice",
      options: [{content: "Very Bad"}, {content: "Bad"}, {content: "Moderate"}, {content: "Good"}, {content: "Very Good"}]
    },
    {
      questionText: "The materials used to support assignments in the course (texts, readings, websites, etc.) were useful",
      questionType: "Multiple Choice",
      options: [{content: "Very Bad"}, {content: "Bad"}, {content: "Moderate"}, {content: "Good"}, {content: "Very Good"}]
    },
    {
      questionText: "What has been the best aspect of this course?",
      questionType: "Open Ended",
      options: [{content: ""}]
    },
    {
      questionText: "Would you change anything about this course/instructor? If so, what would you change?",
      questionType: "Open Ended",
      options: [{content: ""}]
    }
  ]

  survey: FormGroup;
  questionForm: FormGroup;
  optionForm: FormGroup;
  constructor(private route: ActivatedRoute,
              private router: Router,
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
      questionType: new FormControl(null, []),
      options: new FormControl([{content: ""}], []),
    })
    this.optionForm = this.formBuilder.group({
      content: new FormControl(null, [Validators.required]),
    })
  }

  ngOnInit(): void {
  }

  createSurvey() {
    const courseId = this.route.snapshot.paramMap.get('id');
    if(this.survey.invalid){return;}
    this.formService.createSurvey(courseId,this.survey.value).subscribe(
      (data)=>{
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Form created Successfully'});
        this.router.navigate(['../'], { relativeTo: this.route });
      },
      (error)=>{
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Form Create Failed'});
      },
    )

  }

  createQuestion(){
    this.questionForm.controls['questionType'].setValue(this.questionType);
    this.survey.value['questions'].push(this.questionForm.value);
    this.addQuestion = false;

  }

  createOption(){
    this.questionForm.value['options'].push({content:this.optionForm.value['content']});
    this.addOption = false;
    this.optionForm.reset();

  }
  resetForms(){
    this.questionType= "Open Ended";
    this.addOption = false;
    this.optionForm.reset();
    this.questionForm.reset();
    this.questionForm.controls['options'].setValue([{content: ""}]);
    let oldSurvey = this.survey.value;
    this.survey.reset();
    this.survey.controls['questions'].setValue(oldSurvey.questions);
    this.survey.controls['startDate'].setValue(oldSurvey.startDate);
    this.survey.controls['endDate'].setValue(oldSurvey.endDate);
    this.survey.controls['name'].setValue(oldSurvey.name);

  }
}
