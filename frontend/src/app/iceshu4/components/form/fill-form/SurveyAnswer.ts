import {Answer} from "./Answer";

export class SurveyAnswer {
  id!: number;
  studentId!: number;
  surveyId!: number;
  submitted !: boolean;
  answers!: Answer[];
}
