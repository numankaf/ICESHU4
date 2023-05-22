package com.cyberbullies.iceshu4.controller;

import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.cyberbullies.iceshu4.service.DepartmentService;
import com.cyberbullies.iceshu4.entity.Department;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/department")
@AllArgsConstructor
public class DepartmentController {
    private DepartmentService departmentService;

    @GetMapping("/findAll")
    public List<Department> findAll() {
        return departmentService.findAll();
    }

    @GetMapping("/get/{id}")
    public Department getDepartmentById(@PathVariable Long id) {
        return departmentService.getDepartmentById(id);
    }
}
