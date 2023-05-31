package com.cyberbullies.iceshu4.repository;

import com.cyberbullies.iceshu4.entity.SurveyAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface SurveyAnswerRepository extends JpaRepository<SurveyAnswer,Long> {
    public Optional<SurveyAnswer> findByStudentIdAndSurveyId(Long studentId, Long surveyId);
    List<SurveyAnswer> findAllByStudentId(Long studentId);
    void deleteAllBySurveyId(Long surveyId);
}
