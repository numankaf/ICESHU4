package com.cyberbullies.iceshu4.entity;

import com.cyberbullies.iceshu4.dto.QuestionOption;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "question")
@Data
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;
    private String questionText;
    private String questionType;
//    private List<String> options;
}
