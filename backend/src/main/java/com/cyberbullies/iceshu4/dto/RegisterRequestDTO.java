package com.cyberbullies.iceshu4.dto;

import com.cyberbullies.iceshu4.entity.Department;

import lombok.Data;

@Data
public class RegisterRequestDTO {
    private String name;
    private String surname;
    private String email;
    private String password;
    private Department department;

}
