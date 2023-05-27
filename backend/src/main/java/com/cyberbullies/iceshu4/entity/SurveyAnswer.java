package com.cyberbullies.iceshu4.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Setter
@Getter
@Entity
@Table(name = "surveyanswer")
@Data
public class SurveyAnswer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;
    private Long studentId;
    private Long surveyId;
    private boolean isSubmitted= false;
    @OneToMany(cascade = CascadeType.ALL)
    List<Answer> answers;
}
