package com.cyberbullies.iceshu4.controller;

import com.cyberbullies.iceshu4.dto.MessageDTO;
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

    @PostMapping("/sendMessage")
    public ResponseEntity<String> sendMessage(@RequestBody MessageDTO message)
    {
        /*
        if (userService.getUserByEmail(message.getToUserEmail()) == null)
            return new ResponseEntity<>("There is not such user", HttpStatus.BAD_REQUEST);
        */

        System.out.println(message.getBody());

        messageService.sendMessage(message);
        return new ResponseEntity<>("Message sent", HttpStatus.OK);
    }

    @GetMapping("/findAll")
    public List<Message> findAll()
    {
        return messageService.findAll();
    }
}
