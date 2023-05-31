package com.cyberbullies.iceshu4.service;

import com.cyberbullies.iceshu4.dto.ReevaluationRequestDTO;
import com.cyberbullies.iceshu4.entity.*;
import com.cyberbullies.iceshu4.enums.UserRole;
import com.cyberbullies.iceshu4.repository.ReevaluationRequestRepository;
import com.cyberbullies.iceshu4.repository.SurveyAnswerRepository;
import com.cyberbullies.iceshu4.repository.SurveyRepository;
import com.cyberbullies.iceshu4.repository.UserRepository;

import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class ReevaluationRequestService {
    private final ReevaluationRequestRepository reevaluationRequestRepository;
    private final SurveyRepository surveyRepository;
    private final SurveyAnswerRepository surveyAnswerRepository;
    private final UserRepository userRepository;

    public void createReevaluationRequest(ReevaluationRequestDTO dto) {
        if (dto.getSurvey().getReevaluation_request() != null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Can not create re-evaluation request more than once!");
        }
        if (!dto.getSurvey().isPublished()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Can not create re-evaluation request to non-published survey!");
        }
        ReevaluationRequest reevaluationRequest = new ReevaluationRequest();
        Survey survey = dto.getSurvey();
        survey.setStatus(true);
        survey.setPublished(false);
        reevaluationRequest.setContent(dto.getContent());
        reevaluationRequest.setSurvey(dto.getSurvey());
        reevaluationRequest.setAccepted(false);
        reevaluationRequestRepository.save(reevaluationRequest);
        surveyRepository.save(survey);
    }
    @Transactional
    public void acceptReevaluationRequest(Long id) {
        ReevaluationRequest reevaluationRequest = reevaluationRequestRepository.findById(id).orElse(null);
        Survey survey = reevaluationRequest.getSurvey();
        reevaluationRequest.setAccepted(true);
        survey.setStatus(false);
        survey.setPublished(true);
        survey.setStartDate(LocalDate.now());
        if (LocalDate.now().isAfter(survey.getEndDate())){
            survey.setEndDate(LocalDate.now().plusDays(3));
        }
        reevaluationRequest.setSurvey(null);
        for(SurveyAnswer sa: survey.getSurveyAnswers()){
            if(sa.getSurveyId() == survey.getId()){
                sa.setStudentId(null);
                sa.setSubmitted(false);
            }
            surveyAnswerRepository.save(sa);
        }
        reevaluationRequestRepository.deleteById(reevaluationRequest.getId());
        surveyRepository.save(survey);
    }

    public void declineReevaluationRequest(Long id) {
        ReevaluationRequest reevaluationRequest = reevaluationRequestRepository.findById(id).orElse(null);
        Survey survey = reevaluationRequest.getSurvey();
        survey.setStatus(false);
        reevaluationRequest.setAccepted(false);
        reevaluationRequest.setSurvey(null);
        survey.setPublished(true);
        reevaluationRequestRepository.deleteById(reevaluationRequest.getId());
        surveyRepository.save(survey);
    }

    public List<ReevaluationRequest> findAll() {
        return reevaluationRequestRepository.findAll();
    }

    public ReevaluationRequest findRequest(Long id) {
        return reevaluationRequestRepository.findById(id).get();
    }

    public List<ReevaluationRequest> getInstructorRequests(Long id) {
        List<ReevaluationRequest> result = new ArrayList<ReevaluationRequest>();
        User instructor = userRepository.findById(id).get();
        if (!instructor.getRole().equals(UserRole.INSTRUCTOR)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "User is not instructor!");
        }
        List<Course> courses = instructor.getUser_courses();
        for (Course course : courses) {
            for (Survey survey : course.getSurveys()) {
                if (survey.getReevaluation_request() != null) {
                    result.add(survey.getReevaluation_request());
                }
            }
        }
        return result;
    }

    public List<ReevaluationRequest> getDepartmentRequests(Long id) {
        return reevaluationRequestRepository.getDepartmentRequests(id);
    }
}
