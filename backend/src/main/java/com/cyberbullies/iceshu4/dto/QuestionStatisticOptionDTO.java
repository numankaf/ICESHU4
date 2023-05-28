package com.cyberbullies.iceshu4.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class QuestionStatisticOptionDTO {
    private String option_text;
    private Long count;
}
