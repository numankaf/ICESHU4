package com.cyberbullies.iceshu4.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "student")
@Data
public class Student extends User {
    private String school_id;

}
