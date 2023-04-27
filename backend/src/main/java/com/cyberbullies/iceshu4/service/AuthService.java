package com.cyberbullies.iceshu4.service;

import com.cyberbullies.iceshu4.auth.TokenManager;
import com.cyberbullies.iceshu4.dto.ForgotPasswordDTO;
import com.cyberbullies.iceshu4.dto.LoginRequestDTO;
import com.cyberbullies.iceshu4.dto.RegisterRequestDTO;
import com.cyberbullies.iceshu4.dto.ResponseDTO;
import com.cyberbullies.iceshu4.entity.Student;
import com.cyberbullies.iceshu4.enums.UserRole;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class AuthService {
    private PasswordEncoder passwordEncoder;
    private AuthenticationManager authenticationManager;
    private StudentService studentService;
    private TokenManager tokenManager;
    private EmailSenderService emailSenderService;


    public ResponseDTO login(LoginRequestDTO loginRequestDTO){
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(loginRequestDTO.getEmail(),loginRequestDTO.getPassword());
        Authentication auth = authenticationManager.authenticate(authToken);
        SecurityContextHolder.getContext().setAuthentication(auth);
        String jwtToken = tokenManager.generateJwtToken(auth);
        Student student = studentService.getStudentByEmail(loginRequestDTO.getEmail());
        ResponseDTO responseDTO = new ResponseDTO();
        responseDTO.setAccessToken("Bearer "+ jwtToken);
        responseDTO.setUserId(student.getId());

        return responseDTO;
    }

    public void forgotPassword(ForgotPasswordDTO forgotPasswordDTO)
    {
        Student student = studentService.getStudentByEmail(forgotPasswordDTO.getEmail());
        String newPassword = emailSenderService.generatePassword();

        emailSenderService.sendEmail(student.getEmail(), "Password Change Request",
                "Your password has been changed.\nYour new password is: " + newPassword);

       student.setPassword(passwordEncoder.encode(newPassword));

       studentService.save(student);

    }


    public ResponseEntity<ResponseDTO> register(RegisterRequestDTO registerRequestDTO) {
        ResponseDTO responseDTO = new ResponseDTO();
        if(studentService.getStudentByEmail(registerRequestDTO.getEmail()) != null){
            responseDTO.setMessage("Username already in use.");
            return new ResponseEntity<>(responseDTO, HttpStatus.BAD_REQUEST);
        }
        Student student = new Student();
        student.setEmail(registerRequestDTO.getEmail());
        student.setPassword(passwordEncoder.encode(registerRequestDTO.getPassword()));
        student.setName(registerRequestDTO.getName());
        student.setSurname(registerRequestDTO.getSurname());
        student.setRole(UserRole.STUDENT);
        studentService.save(student);

        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(registerRequestDTO.getEmail(),registerRequestDTO.getPassword());
        Authentication auth = authenticationManager.authenticate(authToken);
        SecurityContextHolder.getContext().setAuthentication(auth);//Check this later
        String jwtToken = tokenManager.generateJwtToken(auth);

        responseDTO.setMessage("Student successfully registered.");
        responseDTO.setAccessToken("Bearer "+jwtToken);
        responseDTO.setUserId(student.getId());

        return new ResponseEntity<>(responseDTO,HttpStatus.CREATED);
    }
}
