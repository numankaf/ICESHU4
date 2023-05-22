package com.cyberbullies.iceshu4.repository;

import com.cyberbullies.iceshu4.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long>
{

    Optional<Message> findById(Long id);
    @Query(value = "SELECT * FROM MESSAGES m WHERE m.student_id = ?1", nativeQuery = true)
    List<Message>findAllById(Long id);
}
