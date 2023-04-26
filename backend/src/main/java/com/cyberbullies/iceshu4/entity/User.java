package com.cyberbullies.iceshu4.entity;

import com.cyberbullies.iceshu4.enums.UserRole;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Setter
@Getter
@MappedSuperclass
public abstract class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;
    private String name;
    private String surname;
    private String profile_photo;
    @Enumerated(EnumType.ORDINAL)
    private UserRole role;
    private String password;
    private String email;// will be used as username in JwtUserDetails
    private String birth_date;
    private String about;
    private String address;
}
