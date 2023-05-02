package com.cyberbullies.iceshu4.repository;

import com.cyberbullies.iceshu4.entity.Semester;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SemesterRepository extends JpaRepository<Semester, Long> {
    Semester findByName(String name);
}