package com.cyberbullies.iceshu4.service;

import com.cyberbullies.iceshu4.dto.MessageDTO;
import com.cyberbullies.iceshu4.dto.MessageResponseDTO;
import com.cyberbullies.iceshu4.entity.Message;
import com.cyberbullies.iceshu4.entity.User;
import com.cyberbullies.iceshu4.repository.MessageRepository;
import com.cyberbullies.iceshu4.repository.UserRepository;
import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class MessageService {
    private MessageRepository messageRepository;
    private UserRepository userRepository;

    public void createMessage(MessageDTO message) {
        Message newMessage = new Message();
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email);
        newMessage.setStudent_id(user.getId());
        newMessage.setSubject(message.getSubject());
        newMessage.setContent(message.getContent());
        newMessage.setCreated_date(new Date());
        newMessage.setOpenned(false);
        List<Message> messages = user.getMessages();
        messages.add(newMessage);
        user.setMessages(messages);
        messageRepository.save(newMessage);
    }

    public void responseMessage(MessageResponseDTO messageResponse) {
        Message message = messageRepository.findById(messageResponse.getId()).orElse(null);
        if (message.isOpenned()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Can not respond to openned message!");
        }
        message.setAdmin_response(messageResponse.getAdmin_response());
        message.setResponse_date(new Date());
        message.setOpenned(true);
        messageRepository.save(message);
    }

    public List<Message> findAll() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email);
        return messageRepository.findAllById(user.getId());
    }

    public List<Message> findAllAdmin() {
        return messageRepository.findAll();
    }

    public Message findMessage(Long id) {
        return messageRepository.findById(id).get();
    }

}
