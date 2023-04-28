package com.cyberbullies.iceshu4.entity;

import com.cyberbullies.iceshu4.enums.UserRole;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Setter
@Getter
@Entity
@Table(name = "users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;
    private String name;
    private String surname;
    @Column(name = "profile_photo", length = 10000)
    private String profile_photo;
    @Enumerated(EnumType.ORDINAL)
    private UserRole role;
    private String password;
    private String email;// will be used as username in JwtUserDetails
    private String birth_date;
    private String about;
    private String address;
    private String school_id;
    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "department_id", referencedColumnName = "id")
    private Department department;
    private Boolean banned;
}
