package com.cyberbullies.iceshu4.dto;

import com.cyberbullies.iceshu4.entity.Department;
import com.cyberbullies.iceshu4.enums.UserRole;

import lombok.Data;
import lombok.Setter;
import lombok.Getter;

@Setter
@Getter
@Data
public class UserCreateRequestDTO {
    private String name;
    private String surname;
    private String email;
    private UserRole role;
    private String password;
    private Department department;
}
