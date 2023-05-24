package com.cyberbullies.iceshu4.repository;

import com.cyberbullies.iceshu4.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String username);

    List<User> findAllByIdNot(Long id);

    @Query(value = "SELECT * FROM USERS u WHERE u.role = ?1", nativeQuery = true)
    List<User> findAllByRole(Long id);

    @Query(value = "SELECT * FROM USERS u WHERE u.department_id = ?1 AND u.role = 2", nativeQuery = true)
    List<User> getInstructorsByDepartmentId(Long id);

    @Query(value = "SELECT * FROM USERS u WHERE u.banned = true", nativeQuery = true)
    List<User> getBannedUsers();
}
