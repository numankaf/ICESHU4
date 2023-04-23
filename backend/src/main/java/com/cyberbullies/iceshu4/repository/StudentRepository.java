package com.cyberbullies.iceshu4.repository;

import com.cyberbullies.iceshu4.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student,Long> {
    Student findByEmail(String username);
}
