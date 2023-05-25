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
import com.cyberbullies.iceshu4.entity.User;
import com.cyberbullies.iceshu4.service.CourseService;
import com.cyberbullies.iceshu4.service.UserService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/course")
@AllArgsConstructor
public class CourseController {

    private final CourseService courseService;
    private final UserService userService;

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

    @GetMapping("/getUserCourses/{id}")
    public List<Course> getCoursesById(@PathVariable Long id) {
        return courseService.getCoursesById(id);
    }

    @GetMapping("getDepartmentCourses/{id}")
    public List<Course> getDepartmentCourses(@PathVariable Long id) {
        return courseService.getDepartmentCourses(id);
    }

    @GetMapping("getSemesterCourses/{id}")
    public List<Course> getSemesterCourses(@PathVariable Long id) {
        return courseService.getSemesterCourses(id);
    }

    @PostMapping("/enrollCourse/{UserID}/{CourseID}")
    public ResponseEntity<String> enrollCourse(@PathVariable Long UserID, @PathVariable Long CourseID) {
        if (userService.getUserById(UserID) == null) {
            return new ResponseEntity<>("There is no user with given id", HttpStatus.BAD_REQUEST);
        }
        courseService.enrollCourse(UserID, CourseID);
        return new ResponseEntity<>("User enrolled the Course", HttpStatus.OK);
    }

    @PostMapping("/quitCourse/{UserID}/{CourseID}")
    public ResponseEntity<String> quitCourse(@PathVariable Long UserID, @PathVariable Long CourseID) {
        if (userService.getUserById(UserID) == null) {
            return new ResponseEntity<>("There is no user with given id", HttpStatus.BAD_REQUEST);
        }
        courseService.quitCourse(UserID, CourseID);
        return new ResponseEntity<>("User quitted the Course", HttpStatus.OK);
    }

    @GetMapping("/findCourseStudents/{id}")
    public List<User> findCourseStudents(@PathVariable Long id) {
        return courseService.findCourseStudents(id);
    }

    @GetMapping("/findCourseInstructors/{id}")
    public List<User> findCourseInstructors(@PathVariable Long id) {
        return courseService.findCourseInstructors(id);
    }

    @GetMapping("/getEnrollableCourses/{id}")
    public List<Course> getEnrollableCourses(@PathVariable Long id) {
        return courseService.getEnrollableCourses(id);
    }
}
