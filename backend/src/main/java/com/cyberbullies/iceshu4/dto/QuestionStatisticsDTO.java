package com.cyberbullies.iceshu4.dto;

import java.util.List;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class QuestionStatisticsDTO {
    private Long questionId;
    private List<QuestionStatisticOptionDTO> options;
}
