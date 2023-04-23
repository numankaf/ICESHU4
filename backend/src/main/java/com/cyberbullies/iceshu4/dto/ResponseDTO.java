package com.cyberbullies.iceshu4.dto;

import lombok.Data;

@Data
public class ResponseDTO {
    String message;
    String accessToken;
    Long userId;
}
