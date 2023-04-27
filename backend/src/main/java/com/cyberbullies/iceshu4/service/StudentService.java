package com.cyberbullies.iceshu4.service;

import com.cyberbullies.iceshu4.dto.StudentDetailDTO;
import com.cyberbullies.iceshu4.dto.StudentRequestDTO;
import com.cyberbullies.iceshu4.dto.StudentUpdateRequestDTO;
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

    public StudentDetailDTO getStudentById(Long id) {
        Optional<Student> student = studentRepository.findById(id);
        if (student.isEmpty()) {
            throw new IllegalArgumentException("Id not found");
        }
        StudentDetailDTO dto = new StudentDetailDTO();
        dto.setAbout(student.get().getAbout());
        dto.setName(student.get().getName());
        dto.setSurname(student.get().getSurname());
        dto.setEmail(student.get().getEmail());
        dto.setProfile_photo(student.get().getProfile_photo());
        dto.setAddress(student.get().getAddress());
        dto.setRole(student.get().getRole());
        dto.setBirth_date(student.get().getBirth_date());
        dto.setDepartment(student.get().getDepartment());
        dto.setSchool_id(student.get().getSchool_id());
        return dto;

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

    public Student updateStudentById(Long id, StudentUpdateRequestDTO studentUpdateRequestDTO) {
        Student updateStudent = studentRepository.findById(id).get();
        updateStudent.setName(studentUpdateRequestDTO.getName());
        updateStudent.setSurname(studentUpdateRequestDTO.getSurname());
        updateStudent.setEmail(studentUpdateRequestDTO.getEmail());
        updateStudent.setBirth_date(studentUpdateRequestDTO.getBirth_date());
        updateStudent.setAbout(studentUpdateRequestDTO.getAbout());
        updateStudent.setAddress(studentUpdateRequestDTO.getAddress());
        updateStudent.setProfile_photo(studentUpdateRequestDTO.getProfile_photo());
        return studentRepository.save(updateStudent);
    }

    public List<Student> findAll() {
        return studentRepository.findAll();
    }
}
