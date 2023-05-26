package com.cyberbullies.iceshu4.service;

import com.cyberbullies.iceshu4.entity.Survey;
import com.cyberbullies.iceshu4.repository.SurveyRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class SurveyService {
    private SurveyRepository surveyRepository;
    public Survey create(Survey survey) {
        return surveyRepository.save(survey);
    }

    public void delete(Survey survey) {
        surveyRepository.delete(survey);
    }

    public Survey getSurveyById(Long id) {
        return surveyRepository.findById(id).get();
    }

    public List<Survey> findAll() {
        return surveyRepository.findAll();
    }
}
