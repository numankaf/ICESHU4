package com.cyberbullies.iceshu4.controller;

import com.cyberbullies.iceshu4.dto.ChangePasswordDTO;
import com.cyberbullies.iceshu4.service.AccountService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/changepassword")
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordDTO changePasswordDTO)
    {
        accountService.changePassword(changePasswordDTO);
        return new ResponseEntity<String>("success", HttpStatus.OK);
    }

}
