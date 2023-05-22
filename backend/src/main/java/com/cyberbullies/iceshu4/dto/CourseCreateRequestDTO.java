package com.cyberbullies.iceshu4.dto;

import com.cyberbullies.iceshu4.entity.Semester;
import com.cyberbullies.iceshu4.entity.User;

import java.util.List;

import com.cyberbullies.iceshu4.entity.Department;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class CourseCreateRequestDTO {
    private String name;
    private Department department;
    private Semester semester;
    private List<User> users;
}
