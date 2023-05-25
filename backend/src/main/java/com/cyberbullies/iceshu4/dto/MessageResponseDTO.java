package com.cyberbullies.iceshu4.dto;

import lombok.Data;
import lombok.Getter;

import java.sql.Timestamp;

@Getter
@Data
public class MessageResponseDTO
{
    Long id;
    String admin_response;
    Timestamp response_date;
}
