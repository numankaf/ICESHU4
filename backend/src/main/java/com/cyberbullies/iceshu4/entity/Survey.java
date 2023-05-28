package com.cyberbullies.iceshu4.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "survey")
@Data
public class Survey {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;
    private String name;
    private LocalDate startDate;
    private LocalDate endDate;
    private Long courseId;
    private boolean published = false;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Question> questions;
    @OneToMany(cascade = CascadeType.ALL)
    private List<SurveyAnswer> surveyAnswers;
    @JsonIgnoreProperties("survey")
    @OneToOne(mappedBy = "survey")
    private ReevaluationRequest reevaluation_request;

}
