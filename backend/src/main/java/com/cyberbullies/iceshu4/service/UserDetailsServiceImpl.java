package com.cyberbullies.iceshu4.service;

import com.cyberbullies.iceshu4.dto.JwtUserDetails;
import com.cyberbullies.iceshu4.entity.Student;
import com.cyberbullies.iceshu4.repository.StudentRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private StudentRepository studentRepository;
    public UserDetailsServiceImpl(StudentRepository studentRepository){
        this.studentRepository = studentRepository;
    }
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Student student = studentRepository.findByEmail(email);
        return JwtUserDetails.create(student);
    }
    public UserDetails loadUserById(Long id){
        Student student = studentRepository.findById(id).get();
        return  JwtUserDetails.create(student);
    }

}
