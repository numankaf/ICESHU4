package com.cyberbullies.iceshu4.controller;
import com.cyberbullies.iceshu4.entity.Question;
import com.cyberbullies.iceshu4.entity.Survey;
import com.cyberbullies.iceshu4.service.SurveyService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/survey")
@AllArgsConstructor
public class SurveyController {
    private SurveyService surveyService;

    @PostMapping("/create/{courseID}")
    public ResponseEntity<Survey> createSurvey(@RequestBody Survey survey,@PathVariable Long courseID) {
        return new ResponseEntity<>(surveyService.create(survey,courseID), HttpStatus.OK);
    }

    @GetMapping("/findAll")
    public List<Survey> findAllSurveys() {
        return surveyService.findAllSurveys();
    }
    @GetMapping("/findAll/{courseID}")
    public List<Survey> findAllSurveysOfCourses(@PathVariable Long courseID) {
        return surveyService.findAllSurveysOfCourses(courseID);
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

    @PutMapping("/update/addQuestion/{surveyID}")
    public ResponseEntity<Survey> addQuestion (@PathVariable Long surveyID, @RequestBody Question question){
        return new ResponseEntity<>(surveyService.addQuestion(surveyID,question),HttpStatus.OK);
    }

    @PutMapping("/update/deleteQuestion/{surveyID}/{questionID}")
    public ResponseEntity<Survey> deleteQuestion (@PathVariable Long surveyID,@PathVariable Long questionID){
        return new ResponseEntity<>(surveyService.deleteQuestion(surveyID,questionID),HttpStatus.OK);
    }

    @PutMapping("/publish/{surveyID}")
    public ResponseEntity<String> publishSurvey (@PathVariable Long surveyID){
        if(surveyService.publishSurvey(surveyID)){
            return new ResponseEntity<>("Survey published successfully!",HttpStatus.OK);
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Survey couldn't published successfully!");
    }
}
