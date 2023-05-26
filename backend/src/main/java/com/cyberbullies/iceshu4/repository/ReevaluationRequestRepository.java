package com.cyberbullies.iceshu4.repository;

import com.cyberbullies.iceshu4.entity.ReevaluationRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReevaluationRequestRepository extends JpaRepository<ReevaluationRequest, Long> {

}
