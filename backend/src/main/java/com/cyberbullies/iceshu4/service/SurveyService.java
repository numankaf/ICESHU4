package com.cyberbullies.iceshu4.service;

import com.cyberbullies.iceshu4.dto.QuestionStatisticOptionDTO;
import com.cyberbullies.iceshu4.dto.QuestionStatisticsDTO;
import com.cyberbullies.iceshu4.dto.SurveyAnswerResponseDTO;
import com.cyberbullies.iceshu4.entity.*;
import com.cyberbullies.iceshu4.enums.UserRole;
import com.cyberbullies.iceshu4.repository.AnswerRepository;
import com.cyberbullies.iceshu4.repository.CourseRepository;
import com.cyberbullies.iceshu4.repository.QuestionRepository;
import com.cyberbullies.iceshu4.repository.SurveyRepository;
import com.cyberbullies.iceshu4.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

@Service
@AllArgsConstructor
public class SurveyService {
    private final SurveyRepository surveyRepository;
    private final CourseRepository courseRepository;
    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;
    private final AnswerRepository answerRepository;

    public Survey create(Survey survey, Long courseID) {
        if (courseRepository.findById(courseID).isPresent()) {
            Course course = courseRepository.findById(courseID).get();
            survey.setCourseId(courseID);
            Survey createdSurvey = surveyRepository.save(survey);
            List<Survey> courseSurveys = course.getSurveys();
            courseSurveys.add(createdSurvey);
            courseRepository.save(course);
            return createdSurvey;
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "There is not such a course!");

    }

    public void delete(Survey survey) {
        for (SurveyAnswer surveyAnswer : survey.getSurveyAnswers()) {
            User student = userRepository.findById(surveyAnswer.getStudentId()).get();
            List<SurveyAnswer> updatedSurveyAnswers = student.getSurveyAnswers();
            updatedSurveyAnswers.remove(surveyAnswer);
            student.setSurveyAnswers(updatedSurveyAnswers);
            userRepository.save(student);
        }
        Course course = courseRepository.findById(survey.getCourseId()).get();
        course.getSurveys().remove(survey);
        courseRepository.save(course);
        surveyRepository.delete(survey);
    }

    public Survey getSurveyById(Long id) {
        return surveyRepository.findById(id).get();
    }

    public List<Survey> findAllSurveys() {
        return surveyRepository.findAll();
    }

    public List<Survey> findAllSurveysOfUser(Long userID) {
        if (userRepository.findById(userID).isPresent()) {
            List<Survey> allSurveys = new ArrayList<Survey>();
            User user = userRepository.findById(userID).get();
            if (userRepository.findById(userID).get().getManaged_department() == null) {
                List<Course> userCourses = user.getUser_courses();
                for (Course course : userCourses) {
                    if (user.getRole() == UserRole.STUDENT) {
                        for (Survey survey : course.getSurveys()) {
                            if (survey.isPublished()) {
                                allSurveys.add(survey);
                            }
                        }
                    } else {
                        allSurveys.addAll(course.getSurveys());
                    }
                }
            } else {
                for (Course course : user.getManaged_department().getCourses()) {
                    allSurveys.addAll(course.getSurveys());
                }
            }
            return allSurveys;
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                "There is not such a course or course doesn't have any survey!");
    }

    public List<Survey> findAllSurveysOfCourses(Long courseID) {
        if (courseRepository.findById(courseID).isPresent()
                && !courseRepository.findById(courseID).get().getSurveys().isEmpty()) {
            Course course = courseRepository.findById(courseID).get();
            return course.getSurveys();
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                "There is not such a course or course doesn't have any survey!");
    }

    public List<Survey> findAllSurveysOfCoursesForStudent(Long courseID) {
        List<Survey> allSurveys = new ArrayList<Survey>();
        if (courseRepository.findById(courseID).isPresent()
                && !courseRepository.findById(courseID).get().getSurveys().isEmpty()) {
            Course course = courseRepository.findById(courseID).get();
            for (Survey survey : course.getSurveys()) {
                if (survey.isPublished()) {
                    allSurveys.add(survey);
                }
            }
            return allSurveys;
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                "There is not such a course or course doesn't have any survey!");
    }

    public boolean publishSurvey(Long surveyID) {
        Survey survey = surveyRepository.findById(surveyID).get();
        survey.setPublished(true);
        surveyRepository.save(survey);
        return true;
    }

    public Survey addQuestion(Long surveyID, Question question) {
        Survey survey = surveyRepository.findById(surveyID).get();
        if (!survey.isPublished()) {
            List<Question> surveyQuestions = survey.getQuestions();
            surveyQuestions.add(question);
            return surveyRepository.save(survey);
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Survey cannot be updated!");
    }

    public Survey deleteQuestion(Long surveyID, Long questionID) {
        Survey survey = surveyRepository.findById(surveyID).get();
        if (!survey.isPublished()) {
            List<Question> surveyQuestions = survey.getQuestions();
            Question question = questionRepository.findById(questionID).get();
            surveyQuestions.remove(question);
            questionRepository.deleteById(questionID);
            return surveyRepository.save(survey);
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Survey cannot be updated!");

    }

    public List<SurveyAnswerResponseDTO> findAllSubmittedSurveyAnswers(Long surveyID) {
        if (surveyRepository.findById(surveyID).isPresent()) {
            List<SurveyAnswerResponseDTO> surveyAnswerResponseDTOList = new ArrayList<>();
            for (SurveyAnswer surveyAnswer : surveyRepository.findById(surveyID).get().getSurveyAnswers()) {
                if (surveyAnswer.isSubmitted()) {
                    surveyAnswerResponseDTOList.add(mapSurveyAnswerToSurveyAnswerResponseDTO(surveyAnswer));
                }
            }
            return surveyAnswerResponseDTOList;
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "There is not such a survey!");
        }
    }

    private SurveyAnswerResponseDTO mapSurveyAnswerToSurveyAnswerResponseDTO(SurveyAnswer surveyAnswer) {
        SurveyAnswerResponseDTO surveyAnswerResponseDTO = new SurveyAnswerResponseDTO();
        surveyAnswerResponseDTO.setId(surveyAnswer.getId());
        surveyAnswerResponseDTO.setSurveyId(surveyAnswer.getSurveyId());
        surveyAnswerResponseDTO.setStudentId(surveyAnswerResponseDTO.getStudentId());
        User student = userRepository.findById(surveyAnswer.getStudentId()).get();
        surveyAnswerResponseDTO.setStudentName(student.getName());
        surveyAnswerResponseDTO.setStudentSurname(student.getSurname());
        surveyAnswerResponseDTO.setProfilePhoto(student.getProfile_photo());
        surveyAnswerResponseDTO.setAnswers(surveyAnswer.getAnswers());
        return surveyAnswerResponseDTO;
    }

    public List<QuestionStatisticsDTO> getStatistics(Long id) {
        List<QuestionStatisticsDTO> result = new ArrayList<QuestionStatisticsDTO>();
        Survey survey = surveyRepository.findById(id).get();
        List<Question> questions = survey.getQuestions();
        for (Question question : questions) {
            QuestionStatisticsDTO dto = new QuestionStatisticsDTO();
            List<QuestionStatisticOptionDTO> lst = new ArrayList<QuestionStatisticOptionDTO>();
            dto.setQuestionId(question.getId());
            for (QuestionOption option : question.getOptions()) {
                QuestionStatisticOptionDTO option_dto = new QuestionStatisticOptionDTO();
                option_dto.setOption_id(option.getId());
                option_dto.setOption_text(option.getContent());
                option_dto.setCount(answerRepository.getOptionCounts(option.getId(), question.getId()));
                lst.add(option_dto);
            }
            dto.setOptions(lst);
            result.add(dto);
        }
        return result;
    }
}
