package com.cyberbullies.iceshu4.dto;

import lombok.Data;
import lombok.Getter;

@Getter
@Data
public class ReevaluationRequestDTO
{
    String content;
    Long survey_id;
}
