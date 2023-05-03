package com.cyberbullies.iceshu4.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cyberbullies.iceshu4.dto.SemesterCreateRequestDTO;
import com.cyberbullies.iceshu4.service.SemesterService;
import com.cyberbullies.iceshu4.entity.Semester;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/semester")
@AllArgsConstructor
public class SemesterController {
    private SemesterService semesterService;

    @PostMapping("/create")
    public ResponseEntity<String> createSemester(@RequestBody SemesterCreateRequestDTO semester) {
        if (semesterService.getSemesterByName(semester.getName()) != null) {
            return new ResponseEntity<>("There is already a semester with given name", HttpStatus.BAD_REQUEST);
        }
        semesterService.createSemester(semester);
        return new ResponseEntity<>("Semester is created", HttpStatus.OK);
    }

    @GetMapping("/findAll")
    public List<Semester> findAll() {
        return semesterService.findAll();
    }
}
