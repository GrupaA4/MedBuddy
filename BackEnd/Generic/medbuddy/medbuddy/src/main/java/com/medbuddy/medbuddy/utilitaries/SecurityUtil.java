package com.medbuddy.medbuddy.utilitaries;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.UUID;

public class SecurityUtil {
    public static UUID getNewId() {
        return UUID.randomUUID();
    }

    //see what an encrypted password looks like
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String rawPassword = "dummy";
        String encodedPassword = encoder.encode(rawPassword);
        System.out.println(encodedPassword);
    }

    public static String getEmail() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            return  ((UserDetails) principal).getUsername();
        } else {
            return principal.toString();
        }
    }

    private SecurityUtil() {
    }
}
