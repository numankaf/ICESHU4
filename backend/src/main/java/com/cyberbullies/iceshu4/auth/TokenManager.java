package com.cyberbullies.iceshu4.auth;

import com.cyberbullies.iceshu4.dto.JwtUserDetails;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class TokenManager {
    @Value("${iceshu4.app.secret}")
    private String APP_SECRET;
    @Value("${iceshu4.expires.in}")
    private long EXPIRES_IN;

    public String generateJwtToken(Authentication auth) {
        JwtUserDetails userDetails = (JwtUserDetails) auth.getPrincipal();
        Date expireDate = new Date(new Date().getTime() + EXPIRES_IN);
        return Jwts.builder().setSubject(Long.toString(userDetails.getId())).claim("role", userDetails.getAuthorities()).
                setIssuedAt(new Date()).setExpiration(expireDate).
                signWith(SignatureAlgorithm.HS512, APP_SECRET).compact();
    }

    public Long getUserIdFromJwt(String token){
        Claims claims = Jwts.parser().setSigningKey(APP_SECRET).parseClaimsJws(token).getBody();
        return Long.parseLong(claims.getSubject());
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(APP_SECRET).parseClaimsJws(token);
            return !isTokenExpired(token);
        } catch (SignatureException | MalformedJwtException | ExpiredJwtException | UnsupportedJwtException | IllegalArgumentException e) {
            return false;
        }
    }

    private boolean isTokenExpired(String token) {
        Date expiration = Jwts.parser().setSigningKey(APP_SECRET).parseClaimsJws(token).getBody().getExpiration();
        return expiration.before(new Date());
    }
}
