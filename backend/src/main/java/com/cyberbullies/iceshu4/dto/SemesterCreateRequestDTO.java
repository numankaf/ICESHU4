package com.cyberbullies.iceshu4.dto;

import java.sql.Timestamp;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class SemesterCreateRequestDTO {
    private String name;
    private Timestamp start_date;
    private Timestamp end_date;
}
