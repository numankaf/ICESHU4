package com.cyberbullies.iceshu4.dto;

import com.cyberbullies.iceshu4.entity.Department;
import com.cyberbullies.iceshu4.enums.UserRole;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class StudentDetailDTO {
    private String name;
    private String surname;
    private String email;
    private UserRole role;
    private String birth_date;
    private String profile_photo;
    private String about;
    private String address;
    private String school_id;
    private Department department;
}
