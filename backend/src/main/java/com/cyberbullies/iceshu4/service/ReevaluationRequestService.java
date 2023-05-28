package com.cyberbullies.iceshu4.service;

import com.cyberbullies.iceshu4.dto.ReevaluationRequestDTO;
import com.cyberbullies.iceshu4.entity.ReevaluationRequest;
import com.cyberbullies.iceshu4.entity.Survey;
import com.cyberbullies.iceshu4.repository.ReevaluationRequestRepository;
import com.cyberbullies.iceshu4.repository.SurveyRepository;

import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;

@Service
@AllArgsConstructor
public class ReevaluationRequestService {
    private final ReevaluationRequestRepository reevaluationRequestRepository;
    private final SurveyRepository surveyRepository;

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

    public void acceptReevaluationRequest(Long id) {
        ReevaluationRequest reevaluationRequest = reevaluationRequestRepository.findById(id).orElse(null);
        Survey survey = reevaluationRequest.getSurvey();
        reevaluationRequest.setAccepted(true);
        survey.setStatus(false);
        survey.setPublished(true);
        survey.setStartDate(LocalDate.now());
        survey.setEndDate(LocalDate.now().plusDays(3));
        reevaluationRequest.setSurvey(null);
        reevaluationRequestRepository.save(reevaluationRequest);
        surveyRepository.save(survey);
    }

    public void declineReevaluationRequest(Long id) {
        ReevaluationRequest reevaluationRequest = reevaluationRequestRepository.findById(id).orElse(null);
        Survey survey = reevaluationRequest.getSurvey();
        survey.setStatus(false);
        survey.setPublished(false);
        reevaluationRequest.setAccepted(false);
        reevaluationRequest.setSurvey(null);
        reevaluationRequestRepository.save(reevaluationRequest);
        surveyRepository.save(survey);
    }

    public List<ReevaluationRequest> findAll() {
        return reevaluationRequestRepository.findAll();
    }

    public ReevaluationRequest findRequest(Long id) {
        return reevaluationRequestRepository.findById(id).get();
    }
}
