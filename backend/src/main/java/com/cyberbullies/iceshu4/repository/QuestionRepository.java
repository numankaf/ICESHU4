package com.cyberbullies.iceshu4.repository;

import com.cyberbullies.iceshu4.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question,Long> {
}
