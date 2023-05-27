import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormService} from "../form.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {AuthenticationService} from "../../../core/authentication.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-form-edit',
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.scss'],
  providers:[MessageService, ConfirmationService]
})
export class FormEditComponent {
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
  surveyId:any;
  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private formService: FormService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private authenticationService: AuthenticationService) {
    this.surveyId = this.route.snapshot.paramMap.get('id');
    this.userData = authenticationService.decodeToken(this.authenticationService.getToken() || "");
    this.survey = this.formBuilder.group({
      name: new FormControl(null, [Validators.required]),
      startDate: new FormControl(null, [Validators.required]),
      endDate: new FormControl(null, [Validators.required]),
      questions: new FormControl([], []),
    });
    this.questionForm = this.formBuilder.group({
      id: new FormControl(null, ),
      questionText: new FormControl(null, [Validators.required]),
      questionType: new FormControl(null, []),
      options: new FormControl([{content: ""}], []),
    })
    this.optionForm = this.formBuilder.group({
      content: new FormControl(null, [Validators.required]),
    })
  }

  ngOnInit(): void{
    this.formService.getSurveyById(this.surveyId).subscribe((data)=>{
        this.survey.patchValue(data);

      }
    )

  }


  createQuestion(){
    this.questionForm.controls['questionType'].setValue(this.questionType);
    this.addQuestion = false;
    this.formService.addQuestion(this.surveyId,this.questionForm.value).subscribe(
      (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'You added the question successfully'
        });
        this.ngOnInit();
      },
      (error) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Question add failed'});
      }
    );
    this.ngOnInit();

  }
  confirmDelete(questionId: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this question?',
      header: 'Delete Question',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteQuestion(questionId);
      },
      key: "deleteDialog"
    });
  }

  deleteQuestion(questionId: any){
    this.formService.deleteQuestion(this.surveyId,questionId).subscribe(
      (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'You deleted the question successfully'
        });
        this.ngOnInit();
      },
      (error) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Question deletion failed'});
      }
    );
    this.ngOnInit();
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
  }
}
