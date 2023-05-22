package com.cyberbullies.iceshu4.service;

import com.cyberbullies.iceshu4.dto.MessageDTO;
import com.cyberbullies.iceshu4.dto.MessageResponseDTO;
import com.cyberbullies.iceshu4.entity.Message;
import com.cyberbullies.iceshu4.entity.User;
import com.cyberbullies.iceshu4.repository.MessageRepository;
import com.cyberbullies.iceshu4.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@AllArgsConstructor
public class MessageService
{
    private MessageRepository messageRepository;
    private UserRepository userRepository;


    public void createMessage(MessageDTO message)
    {
        Message newMessage = new Message();
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email);
        newMessage.setStudent_id(user.getId());
        newMessage.setSubject(message.getSubject());
        newMessage.setContent(message.getContent());
        newMessage.setCreated_date(message.getCreated_date());
        newMessage.setOpenned(true);
        messageRepository.save(newMessage);
    }

    public void responseMessage(MessageResponseDTO messageResponse)
    {
        Message message = messageRepository.findById(messageResponse.getId()).orElse(null);
        message.setAdmin_response(messageResponse.getAdmin_response());
        message.setOpenned(false);
        messageRepository.save(message);

    }

    public List<Message> findAll()
    {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email);
        return messageRepository.findAllById(user.getId());
    }

    public List<Message> findAllAdmin()
    {
        return messageRepository.findAll();
    }

}
