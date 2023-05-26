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
//     @JsonIgnore
    @ManyToOne(targetEntity = Department.class)
    @JoinColumn(name = "department_id", referencedColumnName = "id", nullable = false)
    private Department department;
//     @JsonIgnore
    @ManyToOne(targetEntity = Semester.class)
    @JoinColumn(name = "semester_id", referencedColumnName = "id", nullable = false)
    private Semester semester;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "courses_users",
                joinColumns = {@JoinColumn(name = "course_id",referencedColumnName = "id")},
                inverseJoinColumns = {@JoinColumn(name="user_id",referencedColumnName = "id")}
    )
    @JsonIgnore
    private List<User> users;
    
    @OneToMany(cascade = CascadeType.ALL)
    private List<Survey> surveys;

}