package com.cyberbullies.iceshu4.controller;

import com.cyberbullies.iceshu4.service.SemesterService;
import com.cyberbullies.iceshu4.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cyberbullies.iceshu4.dto.RegisterRequestDTO;
import com.cyberbullies.iceshu4.dto.SemesterCreateRequestDTO;
import com.cyberbullies.iceshu4.dto.UserDetailDTO;
import com.cyberbullies.iceshu4.dto.UserUpdateRequestDTO;
import lombok.AllArgsConstructor;

import java.util.List;

@RestController
@RequestMapping("/admin")
@AllArgsConstructor
public class AdminController {
    private UserService userService;
    private SemesterService semesterService;

    @GetMapping("/findAll")
    public List<UserDetailDTO> findAll() {
        return userService.findAll();
    }

    @GetMapping("/get/{id}")
    public UserDetailDTO getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
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
        userService.updateUserById(id, student);
        return new ResponseEntity<String>("User is updated!", HttpStatus.OK);
    }

    @PostMapping("/create/user")
    public ResponseEntity<String> createUser(@RequestBody RegisterRequestDTO user) {
        if (userService.getUserByEmail(user.getEmail()) != null) {
            return new ResponseEntity<>("There is already a user with given email", HttpStatus.BAD_REQUEST);
        }
        userService.createUser(user);
        return new ResponseEntity<>("User is created", HttpStatus.OK);
    }

    @PostMapping("/create/semester")
    public ResponseEntity<String> createSemester(@RequestBody SemesterCreateRequestDTO semester) {
        if (semesterService.getSemesterByName(semester.getName()) != null) {
            return new ResponseEntity<>("There is already a semester with given name", HttpStatus.BAD_REQUEST);
        }
        semesterService.createSemester(semester);
        return new ResponseEntity<>("Semester is created", HttpStatus.OK);
    }

}
