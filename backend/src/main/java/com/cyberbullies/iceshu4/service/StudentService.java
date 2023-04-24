package com.cyberbullies.iceshu4.service;

import com.cyberbullies.iceshu4.dto.StudentRequestDTO;
import com.cyberbullies.iceshu4.entity.Student;
import com.cyberbullies.iceshu4.repository.StudentRepository;
import lombok.AllArgsConstructor;

import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class StudentService {
    private StudentRepository studentRepository;
    private PasswordEncoder passwordEncoder;

    public Student getStudentByEmail(String email) {
        return studentRepository.findByEmail(email);
    }

    public Optional<Student> getStudentById(Long id) {
        return studentRepository.findById(id);
    }

    public void saveByAdmin(StudentRequestDTO studentDTO) {
        Student newStudent = new Student();
        newStudent.setName(studentDTO.getName());
        newStudent.setSurname(studentDTO.getSurname());
        newStudent.setPassword(passwordEncoder.encode(studentDTO.getPassword()));
        newStudent.setEmail(studentDTO.getEmail());
        newStudent.setRole(studentDTO.getRole());
        studentRepository.save(newStudent);
    }

    public void save(Student student) {
        studentRepository.save(student);
    }

    public List<Student> findAll() {
        return studentRepository.findAll();
    }
}
