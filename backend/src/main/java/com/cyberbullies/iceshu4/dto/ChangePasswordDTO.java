package com.cyberbullies.iceshu4.dto;

import lombok.Data;

@Data
public class ChangePasswordDTO
{
    String currentPassword;
    String newPassword;
}
