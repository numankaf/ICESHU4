package com.cyberbullies.iceshu4.service;

import com.cyberbullies.iceshu4.entity.Student;
import com.cyberbullies.iceshu4.repository.StudentRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class StudentService {
    private StudentRepository studentRepository;
    public Student getStudentByEmail(String email) {
        return studentRepository.findByEmail(email);
    }

    public void save(Student student) {
        studentRepository.save(student);
    }
}
