package com.cyberbullies.iceshu4.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cyberbullies.iceshu4.dto.SemesterCreateRequestDTO;
import com.cyberbullies.iceshu4.entity.Semester;
import com.cyberbullies.iceshu4.repository.SemesterRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class SemesterService {
    private final SemesterRepository semesterRepository;

    public Semester getSemesterByName(String name) {
        return semesterRepository.findByName(name);
    }

    public void createSemester(SemesterCreateRequestDTO semester) {
        Semester createdSemester = new Semester();
        createdSemester.setName(semester.getName());
        createdSemester.setStart_date(semester.getStart_date());
        createdSemester.setEnd_date(semester.getEnd_date());
        semesterRepository.save(createdSemester);
    }

    public List<Semester> findAll() {
        return semesterRepository.findAll();
    }

    public Semester getSemesterById(Long id) {
        return semesterRepository.findById(id).get();
    }

    public void delete(Long id) {
        semesterRepository.deleteById(id);
    }
}
