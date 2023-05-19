package com.cyberbullies.iceshu4.repository;

import com.cyberbullies.iceshu4.dto.MessageDTO;
import com.cyberbullies.iceshu4.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long>
{
    @Query(value = "SELECT * FROM MESSAGES m WHERE m.from_user_email = ?1 OR m.to_user_email = ?1", nativeQuery = true)
    List<Message> findAllByEmail(String email);
}
