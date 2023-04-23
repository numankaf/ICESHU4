package com.cyberbullies.iceshu4.entity;

import com.cyberbullies.iceshu4.enums.UserRole;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="student")
@Data
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String surname;
    private String school_id;
    @Enumerated(EnumType.STRING)
    private UserRole role;
    private String password;
    private String email;// will be used as username in JwtUserDetails
    private String birth_date;
    private String about;
    private String address;

}
