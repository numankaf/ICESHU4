package com.cyberbullies.iceshu4.dto;

import com.cyberbullies.iceshu4.entity.User;
import com.cyberbullies.iceshu4.enums.UserRole;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Getter
@Setter
public class JwtUserDetails implements UserDetails {
    private Long id;
    private String username;
    private String password;
    private Long departmentId;
    private Collection<? extends GrantedAuthority> authorities;

    private JwtUserDetails(Long id, String username, String password, Collection<? extends GrantedAuthority> authorities, Long departmentId) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.authorities = authorities;
        this.departmentId = departmentId;
    }

    //TODO: change student to the  general user class
    public static JwtUserDetails create(User user) {
        List<GrantedAuthority> authoritiesList = new ArrayList<>();
        authoritiesList.add(new SimpleGrantedAuthority(user.getRole().toString()));
        Long departmentId;
        if (user.getRole() == UserRole.ADMIN) {
            departmentId = null;
        }
        else if(user.getRole()== UserRole.DEPARTMENT_MANAGER){
            departmentId = user.getManaged_department().getId();
        }
        else {
            departmentId = user.getDepartment().getId();
        }
        return new JwtUserDetails(user.getId(), user.getEmail(), user.getPassword(), authoritiesList, departmentId);
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
