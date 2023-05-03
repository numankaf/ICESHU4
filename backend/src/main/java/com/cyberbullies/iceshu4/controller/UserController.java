package com.cyberbullies.iceshu4.controller;

import com.cyberbullies.iceshu4.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cyberbullies.iceshu4.dto.CreateUserRequestDTO;
import com.cyberbullies.iceshu4.dto.RegisterRequestDTO;
import com.cyberbullies.iceshu4.dto.UserDetailDTO;
import com.cyberbullies.iceshu4.dto.UserUpdateRequestDTO;
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
        userService.updateUserById(id, student);
        return new ResponseEntity<String>("User is updated!", HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<String> createUser(@RequestBody CreateUserRequestDTO user) {
        if (userService.getUserByEmail(user.getEmail()) != null) {
            return new ResponseEntity<>("There is already a user with given email", HttpStatus.BAD_REQUEST);
        }
        userService.createUser(user);
        return new ResponseEntity<>("User is created", HttpStatus.OK);
    }

}
