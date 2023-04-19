package com.example.demo.service;

import org.springframework.stereotype.Service;

import com.example.demo.dto.RegistrationRequestDTO;
import com.example.demo.entity.AppUser;
import com.example.demo.entity.AppUserRole;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class RegistrationService {

    private final AppUserService appUserService;

    public String register(RegistrationRequestDTO user) {
        if (!isEmailValid(user.getEmail())) {
            throw new IllegalStateException("email is not valid!");
        }

        return appUserService.signUpUser(new AppUser(
                user.getName(),
                user.getSurname(),
                user.getPassword(),
                user.getEmail(),
                AppUserRole.STUDENT));
    }

    public boolean isEmailValid(String email) {
        return true; // TODO
    }
}
