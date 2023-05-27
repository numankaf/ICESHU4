package com.cyberbullies.iceshu4.service;

import com.cyberbullies.iceshu4.entity.Survey;
import com.cyberbullies.iceshu4.entity.SurveyAnswer;
import com.cyberbullies.iceshu4.entity.User;
import com.cyberbullies.iceshu4.repository.SurveyAnswerRepository;
import com.cyberbullies.iceshu4.repository.SurveyRepository;
import com.cyberbullies.iceshu4.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@AllArgsConstructor
public class SurveyAnswerService {
    private final SurveyAnswerRepository surveyAnswerRepository;
    private final SurveyRepository surveyRepository;
    private final UserRepository userRepository;

    public  SurveyAnswer create(SurveyAnswer surveyAnswer, Long studentID, Long surveyID) {
        if(surveyAnswerRepository.findByStudentIdAndSurveyId(studentID,surveyID).isEmpty()){
            SurveyAnswer returnedSurveyAnswer =surveyAnswerRepository.save(surveyAnswer);
            User student = userRepository.findById(studentID).get();
            List<SurveyAnswer> surveyAnswersOfStudent = student.getSurveyAnswers();
            surveyAnswersOfStudent.add(returnedSurveyAnswer);
            userRepository.save(student);
            Survey survey = surveyRepository.findById(surveyID).get();
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
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"This SurveyAnswer doesn't exist.");
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
