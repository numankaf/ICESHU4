package com.cyberbullies.iceshu4.dto;

import lombok.Data;
import lombok.Getter;

@Getter
@Data
public class MessageDTO
{
    String fromUserEmail;
    String toUserEmail;
    String body;
}
