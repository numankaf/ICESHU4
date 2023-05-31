package com.cyberbullies.iceshu4.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Getter
@Setter
@Entity
@Table(name = "reevalequests")
@Data
public class ReevaluationRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;
    private boolean accepted;
    private String content;
    @JsonIgnoreProperties("reevaluation_request")
    @OneToOne
    @JoinColumn(name = "survey_id", referencedColumnName = "id")
    private Survey survey;
}
