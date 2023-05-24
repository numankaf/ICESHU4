package com.cyberbullies.iceshu4.controller;

import com.cyberbullies.iceshu4.enums.UserRole;
import com.cyberbullies.iceshu4.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cyberbullies.iceshu4.dto.UserCreateRequestDTO;

import com.cyberbullies.iceshu4.dto.UserDetailDTO;
import com.cyberbullies.iceshu4.dto.UserUpdateRequestDTO;
import com.cyberbullies.iceshu4.entity.User;

import lombok.AllArgsConstructor;

import java.util.List;

@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {
    private UserService userService;

    @GetMapping("/findAll")
    public List<UserDetailDTO> findAll() {
        return userService.findAll();
    }

    @GetMapping("/get/{id}")
    public UserDetailDTO getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @GetMapping("/findAllByRole/{id}")
    public List<UserDetailDTO> getUserByRole(@PathVariable Long id) {
        return userService.findAllByRole(id);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteById(@PathVariable Long id) {
        userService.deleteUserById(id);
        return new ResponseEntity<>("User deleted with id :" + id, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateUserById(@PathVariable Long id, @RequestBody UserUpdateRequestDTO student) {
        if (userService.getUserById(id) == null) {
            return new ResponseEntity<>("There are no user by this id!", HttpStatus.BAD_REQUEST);
        }
        if (!userService.getUserById(id).getEmail().equals(student.getEmail())
                && userService.getUserByEmail(student.getEmail()) != null) {
            return new ResponseEntity<>("There are already user with this email!", HttpStatus.BAD_REQUEST);
        }
        userService.updateUserById(id, student);
        return new ResponseEntity<String>("User is updated!", HttpStatus.OK);
    }

    @GetMapping("/findUserRoles")
    public List<UserRole> findUserRoles() {
        return List.of(UserRole.STUDENT, UserRole.INSTRUCTOR, UserRole.ADMIN, UserRole.DEPARTMENT_MANAGER);
    }

    @PostMapping("/create")
    public ResponseEntity<String> createUser(@RequestBody UserCreateRequestDTO user) {
        if (userService.getUserByEmail(user.getEmail()) != null) {
            return new ResponseEntity<>("There is already a user with given email", HttpStatus.BAD_REQUEST);
        }
        userService.createUser(user);
        return new ResponseEntity<>("User is created", HttpStatus.OK);
    }

    @PostMapping("/enrollCourse/{UserID}/{CourseID}")
    public ResponseEntity<String> enrollCourse(@PathVariable Long UserID, @PathVariable Long CourseID) {
        if (userService.getUserById(UserID) == null) {
            return new ResponseEntity<>("There is no user with given id", HttpStatus.BAD_REQUEST);
        }
        userService.enrollCourse(UserID, CourseID);
        return new ResponseEntity<>("User enrolled the Course", HttpStatus.OK);
    }

    @GetMapping("/findCourseStudents/{id}")
    public List<User> findCourseStudents(@PathVariable Long id) {
        return userService.findCourseStudents(id);
    }

    @GetMapping("/findCourseInstructors/{id}")
    public List<User> findCourseInstructors(@PathVariable Long id) {
        return userService.findCourseInstructors(id);
    }

    @GetMapping("/getInstructorsByDepartmentId/{id}")
    public List<User> getInstructorsByDepartmentId(@PathVariable Long id) {
        return userService.getInstructorsByDepartmentId(id);
    }

    @PutMapping("/banUser/{id}")
    public ResponseEntity<String> banUser(@PathVariable Long id)
    {
        if (userService.getUserById(id) == null) {
            return new ResponseEntity<>("There is no user by this id!", HttpStatus.BAD_REQUEST);
        }
        userService.banUser(id);
        return new ResponseEntity<>("User is banned", HttpStatus.OK);
    }

    @GetMapping("/getBannedUsers")
    public List<User> getBannedUsers()
    {
        return userService.getBannedUsers();
    }

    @PutMapping("/unbanUser/{id}")
    public ResponseEntity<String> unbanuser(@PathVariable Long id)
    {
        if (userService.getUserById(id) == null) {
            return new ResponseEntity<>("There are no user by this id!", HttpStatus.BAD_REQUEST);
        }

        userService.unbanUser(id);
        return new ResponseEntity<>("User's ban is removed", HttpStatus.OK);
    }

}
