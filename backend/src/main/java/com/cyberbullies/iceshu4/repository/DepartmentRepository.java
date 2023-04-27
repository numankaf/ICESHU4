package com.cyberbullies.iceshu4.repository;

import com.cyberbullies.iceshu4.entity.Department;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {
    Department findByName(String name);
}
