package com.cyberbullies.iceshu4.controller;

import com.cyberbullies.iceshu4.dto.ReevaluationRequestDTO;
import com.cyberbullies.iceshu4.entity.ReevaluationRequest;
import com.cyberbullies.iceshu4.service.ReevaluationRequestService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reevaluation")
@AllArgsConstructor
public class ReevaluationRequestController {
    private ReevaluationRequestService reevaluationRequestService;

    @PostMapping("/create")
    public ResponseEntity<String> createReevaluationRequest(@RequestBody ReevaluationRequestDTO dto) {
        reevaluationRequestService.createReevaluationRequest(dto);
        return new ResponseEntity<>("Reevaluation Request sent.", HttpStatus.OK);
    }

    @PutMapping("/accept/{id}")
    public ResponseEntity<String> acceptReevaluationRequest(@PathVariable Long id) {
        reevaluationRequestService.acceptReevaluationRequest(id);
        return new ResponseEntity<>("Reevaluation Request accepted.", HttpStatus.OK);
    }

    @PutMapping("/decline/{id}")
    public ResponseEntity<String> declineReevaluationRequest(@PathVariable Long id) {
        reevaluationRequestService.declineReevaluationRequest(id);
        return new ResponseEntity<>("Reevaluation Request declined.", HttpStatus.OK);
    }

    @GetMapping("/findAll")
    public List<ReevaluationRequest> findAll() {
        return reevaluationRequestService.findAll();
    }

    @GetMapping("/get/{id}")
    public ReevaluationRequest findRequestById(@PathVariable Long id) {
        return reevaluationRequestService.findRequest(id);
    }
}
