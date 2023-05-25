package com.cyberbullies.iceshu4.entity;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "messages")
@Data
public class Message
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;
    private long student_id;
    private String subject;
    private String content;
    private Date created_date;
    private Date response_date;
    private boolean openned;
    private String admin_response;

}
