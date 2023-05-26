package com.cyberbullies.iceshu4.controller;

import com.cyberbullies.iceshu4.entity.Course;
import com.cyberbullies.iceshu4.entity.Survey;
import com.cyberbullies.iceshu4.service.SurveyService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/survey")
@AllArgsConstructor
public class SurveyController {
    private SurveyService surveyService;
    @PostMapping("/create")
    public ResponseEntity<Survey> createSurvey(@RequestBody Survey survey) {
        return new ResponseEntity<>(surveyService.create(survey), HttpStatus.OK);
    }

    @GetMapping("/findAll")
    public List<Survey> findAll() {
        return surveyService.findAll();
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Survey> getCourseById(@PathVariable Long id) {
        return new ResponseEntity<>(surveyService.getSurveyById(id),HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteSurvey(@PathVariable Long id){
        surveyService.delete(surveyService.getSurveyById(id));
        return new ResponseEntity<>("Survey deleted successfully!",HttpStatus.OK);
    }
}
