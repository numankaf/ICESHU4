package com.cyberbullies.iceshu4.repository;

import com.cyberbullies.iceshu4.entity.Answer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnswerRepository extends JpaRepository<Answer,Long> {
}
