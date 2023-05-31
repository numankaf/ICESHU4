package com.cyberbullies.iceshu4.repository;

import com.cyberbullies.iceshu4.entity.ReevaluationRequest;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ReevaluationRequestRepository extends JpaRepository<ReevaluationRequest, Long> {
    @Query(value = "SELECT * FROM REEVALEQUESTS r WHERE ?1 = (SELECT department_id FROM COURSE WHERE id = (SELECT course_id FROM COURSE_SURVEYS WHERE surveys_id = r.survey_id))", nativeQuery = true)
    List<ReevaluationRequest> getDepartmentRequests(Long id);
}
