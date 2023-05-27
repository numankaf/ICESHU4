package com.cyberbullies.iceshu4.service;

import com.cyberbullies.iceshu4.dto.ReevaluationRequestDTO;
import com.cyberbullies.iceshu4.entity.ReevaluationRequest;
import com.cyberbullies.iceshu4.repository.ReevaluationRequestRepository;
import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@AllArgsConstructor
public class ReevaluationRequestService {
    private ReevaluationRequestRepository reevaluationRequestRepository;

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
        reevaluationRequest.setContent(dto.getContent());
        reevaluationRequest.setSurvey(dto.getSurvey());
        reevaluationRequest.setAccepted(false);
        reevaluationRequestRepository.save(reevaluationRequest);
    }

    public void acceptReevaluationRequest(Long id) {
        ReevaluationRequest reevaluationRequest = reevaluationRequestRepository.findById(id).orElse(null);
        reevaluationRequest.setAccepted(true);
        reevaluationRequestRepository.save(reevaluationRequest);
    }

    public void declineReevaluationRequest(Long id) {
        ReevaluationRequest reevaluationRequest = reevaluationRequestRepository.findById(id).orElse(null);
        reevaluationRequest.setAccepted(false);
        reevaluationRequestRepository.save(reevaluationRequest);
    }

    public List<ReevaluationRequest> findAll() {
        return reevaluationRequestRepository.findAll();
    }

    public ReevaluationRequest findRequest(Long id) {
        return reevaluationRequestRepository.findById(id).get();
    }
}
