package com.cyberbullies.iceshu4.controller;

import com.cyberbullies.iceshu4.dto.*;
import com.cyberbullies.iceshu4.service.AuthService;

import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthController {

    private AuthService authService;

    @PostMapping("/login")
    public ResponseDTO login(@RequestBody LoginRequestDTO loginRequestDTO) {
        return authService.login(loginRequestDTO);
    }

    @PostMapping("/register")
    public ResponseEntity<ResponseDTO> register(@RequestBody RegisterRequestDTO registerRequestDTO) {
        return authService.register(registerRequestDTO);
    }

    @PostMapping("/forgotpassword")
    public ResponseEntity<String> forgotPassword(@RequestBody ForgotPasswordDTO forgotPasswordDTO)
    {
        authService.forgotPassword(forgotPasswordDTO);
        return new ResponseEntity<String>("success", HttpStatus.OK);
    }

}
