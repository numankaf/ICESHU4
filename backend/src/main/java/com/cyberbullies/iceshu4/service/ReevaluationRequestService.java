package com.cyberbullies.iceshu4.service;

import com.cyberbullies.iceshu4.dto.ReevaluationRequestDTO;
import com.cyberbullies.iceshu4.entity.ReevaluationRequest;
import com.cyberbullies.iceshu4.repository.ReevaluationRequestRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ReevaluationRequestService
{
    private ReevaluationRequestRepository reevaluationRequestRepository;


    public void createReevaluationRequest(ReevaluationRequestDTO dto)
    {
        ReevaluationRequest reevaluationRequest = new ReevaluationRequest();
        reevaluationRequest.setContent(dto.getContent());
        reevaluationRequest.setSurvey_id(dto.getSurvey_id());
        reevaluationRequestRepository.save(reevaluationRequest);
    }


    public void acceptReevaluationRequest(Long id)
    {
        ReevaluationRequest reevaluationRequest = reevaluationRequestRepository.findById(id).orElse(null);
        reevaluationRequest.set_accepted(true);
        reevaluationRequestRepository.save(reevaluationRequest);
    }


    public void declineReevaluationRequest(Long id)
    {
        ReevaluationRequest reevaluationRequest = reevaluationRequestRepository.findById(id).orElse(null);
        reevaluationRequest.set_accepted(false);
        reevaluationRequestRepository.save(reevaluationRequest);
    }


    public List<ReevaluationRequest> findAll()
    {
        return reevaluationRequestRepository.findAll();
    }

    public ReevaluationRequest findRequest(Long id)
    {
        return reevaluationRequestRepository.findById(id).get();
    }
}
