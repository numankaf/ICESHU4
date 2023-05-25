package com.cyberbullies.iceshu4.entity;

import com.cyberbullies.iceshu4.enums.UserRole;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

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
    @Lob
    @Column(name = "profile_photo")
    private String profile_photo;
    @Enumerated(EnumType.ORDINAL)
    private UserRole role;
    @JsonIgnore
    private String password;
    private String email;
    private String birth_date;
    private String about;
    private String address;
    private String school_id;
    private Boolean banned;
    @ManyToOne(targetEntity = Department.class)
    @JoinColumn(name = "department_id", referencedColumnName = "id")
    private Department department;
    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "managed_department_id", referencedColumnName = "id")
    private Department managed_department;
    @ManyToMany(mappedBy = "users",fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Course> user_courses;

}
