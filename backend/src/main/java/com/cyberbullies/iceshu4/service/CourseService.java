package com.cyberbullies.iceshu4.service;

import com.cyberbullies.iceshu4.dto.CourseCreateRequestDTO;
import com.cyberbullies.iceshu4.entity.Course;
import com.cyberbullies.iceshu4.entity.Department;
import com.cyberbullies.iceshu4.entity.Semester;
import com.cyberbullies.iceshu4.entity.User;
import com.cyberbullies.iceshu4.repository.CourseRepository;
import com.cyberbullies.iceshu4.repository.DepartmentRepository;
import com.cyberbullies.iceshu4.repository.UserRepository;
import com.cyberbullies.iceshu4.repository.SemesterRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CourseService {
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private final DepartmentRepository departmentRepository;
    private final SemesterRepository semesterRepository;

    public void create(CourseCreateRequestDTO course) {
        Course createdCourse = new Course();
        createdCourse.setName(course.getName());
        createdCourse.setDepartment(course.getDepartment());
        createdCourse.setSemester(course.getSemester());
        if (!course.getUsers().stream()
                .filter(instructor -> instructor.getDepartment().getId() != course.getDepartment().getId()).findAny()
                .isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Instructor at given department required!");
        }
        createdCourse.setUsers(course.getUsers());
        courseRepository.save(createdCourse);
    }

    public List<Course> findAll() {
        return courseRepository.findAll();
    }

    public Course getCourseByName(String name) {
        return courseRepository.findByName(name);
    }

    public Course getCourseById(Long id) {
        Optional<Course> course = courseRepository.findById(id);
        if (course.isEmpty()) {
            throw new IllegalArgumentException("Id is not found!");
        }
        return course.get();
    }

    public void deleteCourseById(Long id) {
        courseRepository.deleteById(id);
    }

//    public List<Course> getCourses() {
//        String email = SecurityContextHolder.getContext().getAuthentication().getName();
//        User user = userRepository.findByEmail(email);
//        return user.getUser_courses();
//    }
    public List<Course> getCoursesById(Long id) {
        User user = userRepository.findById(id).get();
        return user.getUser_courses();
    }



    public List<Course> getDepartmentCourses(Long id) {
        Department department = departmentRepository.findById(id).get();
        return department.getCourses();
    }

    public List<Course> getSemesterCourses(Long id) {
        Semester semester = semesterRepository.findById(id).get();
        return semester.getCourses();
    }
}
