package com.cyberbullies.iceshu4.auth;

import java.util.*;

import com.cyberbullies.iceshu4.entity.User;
import com.cyberbullies.iceshu4.enums.UserRole;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import org.springframework.security.core.userdetails.UserDetails;

public class Iceshu4UserDetails implements UserDetails {

    private User user;

    public Iceshu4UserDetails(User user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        UserRole role = user.getRole();
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(role.name()));
        return authorities;
    }

    public Long getId(){return user.getId();}
    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return isCredentialsNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return isEnabled();
    }

}