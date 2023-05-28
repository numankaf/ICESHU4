package com.cyberbullies.iceshu4.service;

import com.cyberbullies.iceshu4.entity.*;
import com.cyberbullies.iceshu4.repository.SurveyAnswerRepository;
import com.cyberbullies.iceshu4.repository.SurveyRepository;
import com.cyberbullies.iceshu4.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class SurveyAnswerService {
    private final SurveyAnswerRepository surveyAnswerRepository;
    private final SurveyRepository surveyRepository;
    private final UserRepository userRepository;

    public  SurveyAnswer create(Long studentID, Long surveyID) {
        if(surveyAnswerRepository.findByStudentIdAndSurveyId(studentID,surveyID).isEmpty()){
            SurveyAnswer surveyAnswer = new SurveyAnswer();
            surveyAnswer.setStudentId(studentID);
            surveyAnswer.setSurveyId(surveyID);
            List<Answer> answerList = new ArrayList<>();
            Survey survey = surveyRepository.findById(surveyID).get();
            for(Question question:survey.getQuestions()){
                Answer answer = new Answer();
                answer.setQuestionId(question.getId());
                answerList.add(answer);
            }
            surveyAnswer.setAnswers(answerList);
            SurveyAnswer returnedSurveyAnswer = surveyAnswerRepository.save(surveyAnswer);
            //add returnedSurveyAnswer to the survey answer list of the student
            User student = userRepository.findById(studentID).get();
            List<SurveyAnswer> surveyAnswersOfStudent = student.getSurveyAnswers();
            surveyAnswersOfStudent.add(returnedSurveyAnswer);
            userRepository.save(student);
            //add returnedSurveyAnswer to the survey answer list of the survey
            List<SurveyAnswer> surveyAnswersOfSurvey = survey.getSurveyAnswers();
            surveyAnswersOfSurvey.add(returnedSurveyAnswer);
            surveyRepository.save(survey);
            return returnedSurveyAnswer;
        }else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"This SurveyAnswer already exist.");
        }
    }

    public SurveyAnswer findByStudentIdAndSurveyId(Long studentID, Long surveyID) {
        if(surveyAnswerRepository.findByStudentIdAndSurveyId(studentID,surveyID).isPresent()){
            return surveyAnswerRepository.findByStudentIdAndSurveyId(studentID,surveyID).get();
        }else {
            return create(studentID,surveyID);
        }
    }

    public SurveyAnswer updateSurveyAnswer(SurveyAnswer surveyAnswer) {
        SurveyAnswer updatedSurveyAnswer = surveyAnswerRepository.findById(surveyAnswer.getId()).get();
        updatedSurveyAnswer.setAnswers(surveyAnswer.getAnswers());
        return surveyAnswerRepository.save(updatedSurveyAnswer);
    }

    public SurveyAnswer submitSurveyAnswer(SurveyAnswer surveyAnswer) {
        SurveyAnswer updatedSurveyAnswer = surveyAnswerRepository.findById(surveyAnswer.getId()).get();
        updatedSurveyAnswer.setSubmitted(true);
        return surveyAnswerRepository.save(updatedSurveyAnswer);
    }
}
