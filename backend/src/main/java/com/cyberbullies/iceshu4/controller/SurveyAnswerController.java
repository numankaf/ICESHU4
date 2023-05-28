package com.cyberbullies.iceshu4.controller;

import com.cyberbullies.iceshu4.entity.SurveyAnswer;
import com.cyberbullies.iceshu4.service.SurveyAnswerService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/surveyanswer")
@AllArgsConstructor
public class SurveyAnswerController {
    private final SurveyAnswerService surveyAnswerService;

//    @PostMapping("/create/{studentID}/{surveyID}")
//    public ResponseEntity<SurveyAnswer> createSurveyAnswer(@RequestBody SurveyAnswer surveyAnswer, @PathVariable Long studentID, @PathVariable Long surveyID) {
//        return new ResponseEntity<>(surveyAnswerService.create(surveyAnswer,studentID,surveyID), HttpStatus.OK);
//    }

    @GetMapping("/get/{studentID}/{surveyID}")
    public ResponseEntity<SurveyAnswer> getSurveyAnswer(@PathVariable Long studentID, @PathVariable Long surveyID){
        return new ResponseEntity<>(surveyAnswerService.findByStudentIdAndSurveyId(studentID,surveyID), HttpStatus.OK);
    }

    @PutMapping("/doItLater")
    public ResponseEntity<SurveyAnswer> updateSurveyAnswer(@RequestBody SurveyAnswer surveyAnswer){
        return new ResponseEntity<>(surveyAnswerService.updateSurveyAnswer(surveyAnswer), HttpStatus.OK);
    }

    @PutMapping("/submit")
    public ResponseEntity<SurveyAnswer> submitSurveyAnswer(@RequestBody SurveyAnswer surveyAnswer){
        return new ResponseEntity<>(surveyAnswerService.submitSurveyAnswer(surveyAnswer), HttpStatus.OK);
    }

}
