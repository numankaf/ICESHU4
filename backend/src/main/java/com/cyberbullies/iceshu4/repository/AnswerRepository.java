package com.cyberbullies.iceshu4.repository;

import com.cyberbullies.iceshu4.entity.Answer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long> {

    @Query(value = "SELECT COUNT(a.id) FROM ANSWER a WHERE a.option_id = ?1 AND a.question_id = ?2", nativeQuery = true)
    Long getOptionCounts(Long option_id, Long question_id);
}
