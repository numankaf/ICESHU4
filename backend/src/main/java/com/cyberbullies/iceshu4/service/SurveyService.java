package com.cyberbullies.iceshu4.service;

import com.cyberbullies.iceshu4.entity.Course;
import com.cyberbullies.iceshu4.entity.Question;
import com.cyberbullies.iceshu4.entity.Survey;
import com.cyberbullies.iceshu4.repository.CourseRepository;
import com.cyberbullies.iceshu4.repository.QuestionRepository;
import com.cyberbullies.iceshu4.repository.SurveyRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;


@Service
@AllArgsConstructor
public class SurveyService {
    private SurveyRepository surveyRepository;
    private CourseRepository courseRepository;
    private QuestionRepository questionRepository;
    public Survey create(Survey survey, Long courseID) {
        if(courseRepository.findById(courseID).isPresent()){
            Course course = courseRepository.findById(courseID).get();
            Survey createdSurvey = surveyRepository.save(survey);
            List<Survey> courseSurveys = course.getSurveys();
            courseSurveys.add(createdSurvey);
            courseRepository.save(course);
            return createdSurvey;
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"There is not such a course!");

    }

    public void delete(Survey survey) {
        surveyRepository.delete(survey);
    }

    public Survey getSurveyById(Long id) {
        return surveyRepository.findById(id).get();
    }

    public List<Survey> findAllSurveys() {
        return surveyRepository.findAll();
    }

    public List<Survey> findAllSurveysOfCourses(Long courseID) {
        if(courseRepository.findById(courseID).isPresent() && !courseRepository.findById(courseID).get().getSurveys().isEmpty()){
            Course course = courseRepository.findById(courseID).get();
            return course.getSurveys();
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"There is not such a course or course doesn't have any survey!");
    }

    public boolean publishSurvey(Long surveyID) {
        Survey survey = surveyRepository.findById(surveyID).get();
        survey.setPublished(true);
        surveyRepository.save(survey);
        return true;
    }

    public Survey addQuestion(Long surveyID, Question question) {
        Survey survey = surveyRepository.findById(surveyID).get();
        if(!survey.isPublished()){
            List<Question> surveyQuestions = survey.getQuestions();
            surveyQuestions.add(question);
            return surveyRepository.save(survey);
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Survey cannot be updated!");
    }

    public Survey deleteQuestion(Long surveyID, Long questionID) {
        Survey survey = surveyRepository.findById(surveyID).get();
        if(!survey.isPublished()){
            List<Question> surveyQuestions = survey.getQuestions();
            Question question = questionRepository.findById(questionID).get();
            surveyQuestions.remove(question);
            questionRepository.deleteById(questionID);
            return surveyRepository.save(survey);
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Survey cannot be updated!");

    }
}
