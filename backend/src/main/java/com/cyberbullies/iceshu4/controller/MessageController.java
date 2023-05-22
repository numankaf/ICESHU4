package com.cyberbullies.iceshu4.controller;

import com.cyberbullies.iceshu4.dto.MessageDTO;
import com.cyberbullies.iceshu4.dto.MessageResponseDTO;
import com.cyberbullies.iceshu4.entity.Message;
import com.cyberbullies.iceshu4.service.MessageService;
import com.cyberbullies.iceshu4.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/message")
@AllArgsConstructor
public class MessageController
{
    private UserService userService;
    private MessageService messageService;

    @PostMapping("/createMessage")
    public ResponseEntity<String> sendMessage(@RequestBody MessageDTO message)
    {
        messageService.createMessage(message);
        return new ResponseEntity<>("Message sent.", HttpStatus.OK);
    }

    @PutMapping("/responseMessage")
    public ResponseEntity<String> responseMessage(@RequestBody MessageResponseDTO messageResponse)
    {
        messageService.responseMessage(messageResponse);
        return new ResponseEntity<>("Response sent.", HttpStatus.OK);
    }

    @GetMapping("/findAll")
    public List<Message> findAll()
    {
        return messageService.findAll();
    }


    @GetMapping("/findAllAdmin")
    public List<Message> findAllAdmin()
    {
        return messageService.findAllAdmin();
    }
}
