package com.cyberbullies.iceshu4.controller;

import com.cyberbullies.iceshu4.enums.UserRole;
import com.cyberbullies.iceshu4.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteById(@PathVariable Long id) {
        userService.deleteUserById(id);
        return new ResponseEntity<>("User deleted with id :"+id, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateUserById(@PathVariable Long id, @RequestBody UserUpdateRequestDTO student) {
        if (userService.getUserById(id) == null) {
            return new ResponseEntity<>("There is no student by this id!", HttpStatus.BAD_REQUEST);
        }
        userService.updateUserById(id, student);
        return new ResponseEntity<String>("Student is updated!", HttpStatus.OK);
    }
    @GetMapping("/findUserRoles")
    public List<UserRole> findUserRoles(){
        return List.of(UserRole.STUDENT,UserRole.INSTRUCTOR,UserRole.ADMIN,UserRole.DEPARTMENT_MANAGER);
    }
}
