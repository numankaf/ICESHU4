package com.cyberbullies.iceshu4.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Getter
@Setter
@Entity
@Table(name = "course")
@Data
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;
    private String name;
    // @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "department_id", referencedColumnName = "id", nullable = false)
    private Department department;
    // @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "semester_id", referencedColumnName = "id", nullable = false)
    private Semester semester;
    @JsonIgnore
    @ManyToMany(mappedBy = "user_courses")
    private List<User> users;

}