package com.cyberbullies.iceshu4.repository;

import com.cyberbullies.iceshu4.entity.Course;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    Course findByName(String name);

    @Query(value = "SELECT * FROM COURSE c WHERE c.department_id = ?2 AND c.id NOT IN (SELECT cu.course_id FROM COURSES_USERS cu WHERE cu.user_id = ?1)", nativeQuery = true)
    List<Course> getEnrollableCourses(Long UserID, Long DepartmentID);
}

