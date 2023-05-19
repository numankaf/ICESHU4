package com.cyberbullies.iceshu4.service;

import com.cyberbullies.iceshu4.dto.MessageDTO;
import com.cyberbullies.iceshu4.entity.Message;
import com.cyberbullies.iceshu4.repository.MessageRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class MessageService
{
    private MessageRepository messageRepository;
    //private UserRepository userRepository;


    public List<Message> findAll()
    {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        System.out.println(email);
        //User user = userRepository.findByEmail(email);
        List<Message> messages = messageRepository.findAllByEmail(email);
        //User fromUser = userRepository.findByEmail(messages.get(0).getFromUserEmail());  --> to access who sent the message
        //User toUser = userRepository.findByEmail(messages.get(0).getToUserEmail());  --> to access who received the message
        return messages;
    }


    public void sendMessage(MessageDTO message)
    {
        Message newMessage = new Message();
        newMessage.setFrom_user_email(message.getFromUserEmail());
        newMessage.setTo_user_email(message.getToUserEmail());
        newMessage.setBody(message.getBody());
        messageRepository.save(newMessage);
    }
}
