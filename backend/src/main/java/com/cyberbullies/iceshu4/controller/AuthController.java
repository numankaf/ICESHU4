package com.cyberbullies.iceshu4.controller;

import com.cyberbullies.iceshu4.dto.LoginRequestDTO;
import com.cyberbullies.iceshu4.dto.RegisterRequestDTO;
import com.cyberbullies.iceshu4.dto.ResponseDTO;
import com.cyberbullies.iceshu4.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    // @GetMapping("/department")
    // public ResponseEntity<ResponseDTO> department(@RequestBody Enum
    // departmentEnum) {
    // return authService.getDepartment(departmentEnum);
    // }
}
