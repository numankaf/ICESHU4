package com.cyberbullies.iceshu4.dto;

import lombok.Data;
import lombok.Getter;

import java.sql.Timestamp;

@Getter
@Data
public class MessageDTO
{
    String subject;
    String content;
    Timestamp created_date;

}
