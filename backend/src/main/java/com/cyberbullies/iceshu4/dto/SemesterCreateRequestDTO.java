package com.cyberbullies.iceshu4.dto;

import java.time.LocalDate;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class SemesterCreateRequestDTO {
    private String name;
    private LocalDate start_date;
    private LocalDate end_date;
}
