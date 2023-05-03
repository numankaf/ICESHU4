package com.cyberbullies.iceshu4.controller;

import com.cyberbullies.iceshu4.service.AccountService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cyberbullies.iceshu4.dto.UserDetailDTO;
import com.cyberbullies.iceshu4.dto.UserUpdateRequestDTO;
import lombok.AllArgsConstructor;


@RestController
@RequestMapping("/account")
@AllArgsConstructor
public class AccountController {
    private AccountService accountService;

    @GetMapping("/get")
    public UserDetailDTO getStudentById() {
        return accountService.get();
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateUser( @RequestBody UserUpdateRequestDTO user) {
        accountService.update(user);
        return new ResponseEntity<String>("Student is updated!", HttpStatus.OK);
    }

}
