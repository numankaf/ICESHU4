package com.cyberbullies.iceshu4.service;

import com.cyberbullies.iceshu4.dto.CourseCreateRequestDTO;
import com.cyberbullies.iceshu4.entity.Course;
import com.cyberbullies.iceshu4.entity.Department;
import com.cyberbullies.iceshu4.entity.Semester;
import com.cyberbullies.iceshu4.entity.User;
import com.cyberbullies.iceshu4.enums.UserRole;
import com.cyberbullies.iceshu4.repository.CourseRepository;
import com.cyberbullies.iceshu4.repository.DepartmentRepository;
import com.cyberbullies.iceshu4.repository.UserRepository;
import com.cyberbullies.iceshu4.repository.SemesterRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
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

    public void enrollCourse(Long UserID, Long CourseID) {
        User user = userRepository.findById(UserID).get();
        Course course = courseRepository.findById(CourseID).get();
        if (user.getDepartment().getId() != course.getDepartment().getId()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Student can't take courses from another department!");
        }
        if (!user.getUser_courses().stream().filter(student_course -> CourseID == student_course.getId()).findAny()
                .isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Student can't take courses that already taken'");
        }
        List<User> users = course.getUsers();
        users.add(user);
        course.setUsers(users);
        courseRepository.save(course);
    }

    public void quitCourse(Long UserID, Long CourseID) {
        User user = userRepository.findById(UserID).get();
        Course course = courseRepository.findById(CourseID).get();
        if (user.getUser_courses().stream().filter(student_course -> CourseID == student_course.getId()).findAny()
                .isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Student can only quit courses that already taken!");
        }
        List<User> users = course.getUsers();
        users.removeIf(u -> u.getId() == UserID);
        course.setUsers(users);
        courseRepository.save(course);
    }

    public void addInstructor(Long CourseID, Long UserID) {
        User instructor = userRepository.findById(UserID).get();
        Course course = courseRepository.findById(CourseID).get();
        if (instructor.getRole() != UserRole.INSTRUCTOR) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Only Instructor can be added!");
        }
        if (!course.getUsers().stream().filter(user -> user.getId() == UserID).findAny().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Same Instructor can not be added!");
        }
        if (instructor.getDepartment().getId() != course.getDepartment().getId()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Only the Instructors at the same department can be added!");
        }
        List<User> users = course.getUsers();
        users.add(instructor);
        course.setUsers(users);
        courseRepository.save(course);
    }

    public List<User> findCourseStudents(Long id) {
        Course course = courseRepository.findById(id).get();
        List<User> users = course.getUsers().stream().map(s -> s).filter(user -> user.getRole() == UserRole.STUDENT)
                .collect(Collectors.toList());
        return users;

    }

    public List<User> findCourseInstructors(Long id) {
        Course course = courseRepository.findById(id).get();
        List<User> users = course.getUsers().stream().map(s -> s).filter(user -> user.getRole() == UserRole.INSTRUCTOR)
                .collect(Collectors.toList());
        return users;

    }

    public List<Course> getEnrollableCourses(Long id) {
        User user = userRepository.findById(id).get();
        return courseRepository.getEnrollableCourses(id, user.getDepartment().getId());
    }
}
