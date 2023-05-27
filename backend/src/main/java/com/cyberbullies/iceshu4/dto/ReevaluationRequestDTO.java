package com.cyberbullies.iceshu4.dto;

import com.cyberbullies.iceshu4.entity.Survey;

import lombok.Data;
import lombok.Getter;

@Getter
@Data
public class ReevaluationRequestDTO {
    String content;
    Survey survey;
}
