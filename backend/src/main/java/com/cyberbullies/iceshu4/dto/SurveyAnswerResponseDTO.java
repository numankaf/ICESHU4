package com.cyberbullies.iceshu4.dto;

import com.cyberbullies.iceshu4.entity.Answer;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Data
public class SurveyAnswerResponseDTO {
    private Long id;
    private Long studentId;
    private String studentName;
    private String studentSurname;
    private String profilePhoto;
    private String studentEmail;
    private Long surveyId;
    List<Answer> answers;
}
