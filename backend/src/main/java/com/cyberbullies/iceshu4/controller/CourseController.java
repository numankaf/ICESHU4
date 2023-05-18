package com.cyberbullies.iceshu4.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cyberbullies.iceshu4.dto.CourseCreateRequestDTO;
import com.cyberbullies.iceshu4.entity.Course;
import com.cyberbullies.iceshu4.service.CourseService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/course")
@AllArgsConstructor
public class CourseController {

    private CourseService courseService;

    @PostMapping("/create")
    public ResponseEntity<String> createCourse(@RequestBody CourseCreateRequestDTO course) {
        if (courseService.getCourseByName(course.getName()) != null) {
            return new ResponseEntity<>("There is already a course with this name!", HttpStatus.BAD_REQUEST);
        }
        courseService.create(course);
        return new ResponseEntity<>("Course is created", HttpStatus.OK);
    }

    @GetMapping("/findAll")
    public List<Course> findAll() {
        return courseService.findAll();
    }

    @GetMapping("/get/{id}")
    public Course getCourseById(@PathVariable Long id) {
        return courseService.getCourseById(id);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteCourseById(@PathVariable Long id) {
        if (courseService.getCourseById(id) == null) {
            return new ResponseEntity<>("There is no Course with this id!", HttpStatus.BAD_REQUEST);
        }
        courseService.deleteCourseById(id);
        return new ResponseEntity<>("Course is deleted", HttpStatus.OK);
    }

    @GetMapping("/getStudentCourses/{id}")
    public List<Course> getStudentCourses(@PathVariable Long id) {
        return courseService.getStudentCourses(id);
    }

    @GetMapping("/getInstructorCourses/{id}")
    public List<Course> getInstructorCourses(@PathVariable Long id) {
        return courseService.getInstructorCourses(id);
    }

    @GetMapping("getDepartmentCourses/{id}")
    public List<Course> getDepartmentCourses(@PathVariable Long id) {
        return courseService.getDepartmentCourses(id);
    }

    @GetMapping("getSemesterCourses/{id}")
    public List<Course> getSemesterCourses(@PathVariable Long id) {
        return courseService.getSemesterCourses(id);
    }
}
