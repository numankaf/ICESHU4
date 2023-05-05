package com.cyberbullies.iceshu4.service;

import com.cyberbullies.iceshu4.dto.ChangePasswordDTO;
import com.cyberbullies.iceshu4.dto.UserDetailDTO;
import com.cyberbullies.iceshu4.dto.UserUpdateRequestDTO;
import com.cyberbullies.iceshu4.entity.User;
import com.cyberbullies.iceshu4.repository.UserRepository;
import lombok.AllArgsConstructor;


import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AccountService {
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    public UserDetailDTO get() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email);

        UserDetailDTO dto = new UserDetailDTO();
        dto.setAbout(user.getAbout());
        dto.setName(user.getName());
        dto.setSurname(user.getSurname());
        dto.setEmail(user.getEmail());
        dto.setProfile_photo(user.getProfile_photo());
        dto.setAddress(user.getAddress());
        dto.setRole(user.getRole());
        dto.setBirth_date(user.getBirth_date());
        dto.setSchool_id(user.getSchool_id());
        dto.setDepartment(user.getDepartment());
        dto.setBanned(user.getBanned());
        return dto;
    }

    public User update(UserUpdateRequestDTO userUpdateRequestDTO) {
        String email =SecurityContextHolder.getContext().getAuthentication().getName();
        User updateUser = userRepository.findByEmail(email);
        updateUser.setName(userUpdateRequestDTO.getName());
        updateUser.setSurname(userUpdateRequestDTO.getSurname());
        updateUser.setEmail(userUpdateRequestDTO.getEmail());
        updateUser.setBirth_date(userUpdateRequestDTO.getBirth_date());
        updateUser.setAbout(userUpdateRequestDTO.getAbout());
        updateUser.setAddress(userUpdateRequestDTO.getAddress());
        updateUser.setProfile_photo(userUpdateRequestDTO.getProfile_photo());
        return userRepository.save(updateUser);
    }


    public void changePassword(ChangePasswordDTO changePasswordDTO)
    {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email);

        System.out.println(user.getPassword());

        if (user.getPassword().equals(passwordEncoder.encode(changePasswordDTO.getCurrentPassword())))
        {
            user.setPassword(passwordEncoder.encode(changePasswordDTO.getNewPassword()));
        }

        System.out.println(user.getPassword());

    }

}
