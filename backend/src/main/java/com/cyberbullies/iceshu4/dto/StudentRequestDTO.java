package com.cyberbullies.iceshu4.dto;

import com.cyberbullies.iceshu4.enums.UserRole;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class StudentRequestDTO {
    private String name;
    private String surname;
    private String email;
    private String password;
    private UserRole role;
}
