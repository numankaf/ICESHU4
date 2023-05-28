package com.cyberbullies.iceshu4.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class QuestionStatisticOptionDTO {
    private Long option_id;
    private String option_text;
    private Long count;
}
