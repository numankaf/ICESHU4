package com.cyberbullies.iceshu4.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.Data;

@Setter
@Getter
@Data
public class StudentUpdateRequestDTO {
    private String name;
    private String surname;
    private String email;
    private String birth_date;
    private String about;
    private String address;
}