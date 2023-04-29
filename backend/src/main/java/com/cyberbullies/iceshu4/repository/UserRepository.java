package com.cyberbullies.iceshu4.repository;

import com.cyberbullies.iceshu4.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String username);
    List<User> findAllByIdNot(Long id);
}
