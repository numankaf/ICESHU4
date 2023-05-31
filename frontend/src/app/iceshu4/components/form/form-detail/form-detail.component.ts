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
  statistics: any;
  showAnswers:boolean= false;
  chartDatasPie:any[] = [];
  chartDatasBar:any[] = [];

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
    this.formService.getStatistics(this.surveyId).subscribe((data)=>{
      this.statistics = data;
      this.setChartData();
    })
  }

  setChartData(){
    for(let stat of this.statistics){
      let labels=[];
      let data =[];
      for(let op of stat.options){
        labels.push(op.option_text);
      }
      for(let op of stat.options){
        data.push(op.count);
      }
      const chartData = {
        labels: labels,
        datasets: [
          {
            label:"Answers",
            data: data,
          }
        ]
      };
      const chartOptionsPie = {
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
            }
          }
        }
      };
      const chartOptionsBar = {
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
            }
          }
        }
      };
      this.chartDatasPie.push({data:chartData, options:chartOptionsPie})
      this.chartDatasBar.push({data:chartData, options:chartOptionsBar})
    }
  }

  openAnswers(index:any){
    this.surveyAnswer = this.formAnswers[index];
    this.showAnswers = !this.showAnswers;
  }


}
