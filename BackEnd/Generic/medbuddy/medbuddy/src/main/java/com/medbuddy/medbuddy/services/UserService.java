package com.medbuddy.medbuddy.services;

import com.medbuddy.medbuddy.models.Medic;
import com.medbuddy.medbuddy.models.User;
import com.medbuddy.medbuddy.repository.daos.UserDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.jdbc.core.JdbcTemplate;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.util.Map;
import java.util.UUID;

@Service
public class UserService {

    private final UserDAO userDAO;

    @Autowired
    public UserService(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    public UUID getUserIdByEmail(String email) {
        return userDAO.getUserId(email);
    }

    public void createUser(User userRequest) {
        User user = new User();
        user.setEmail(userRequest.getEmail());
        user.setPassword(userRequest.getPassword());
        user.setLastName(userRequest.getLastName());
        user.setFirstName(userRequest.getFirstName());
        user.setGender(userRequest.getGender());
        user.setPronoun1(userRequest.getPronoun1());
        user.setPronoun2(userRequest.getPronoun2());
        user.setDateOfBirth(userRequest.getDateOfBirth());
        user.setLanguage(userRequest.getLanguage());
        user.setCountry(userRequest.getCountry());
        user.setCity(userRequest.getCity());
        user.setPhoneNumber(userRequest.getPhoneNumber());
        user.setProfileImagePath(userRequest.getProfileImagePath());
        user.setIsAdmin(userRequest.getIsAdmin());
        user.setIsDeleted(userRequest.getIsDeleted());

        userDAO.signupUser(user);
    }

    public User getUser(UUID userId) {
        return userDAO.getUserById(userId);
    }

    public Medic getMedicProfile(UUID userId) {
        User user = userDAO.getUserById(userId);
        return new Medic();
    }

    public void updateUser(UUID userId, User userRequest) {
        User user = userDAO.getUserById(userId);
        user.setEmail(userRequest.getEmail());
        user.setPassword(userRequest.getPassword());
        user.setLastName(userRequest.getLastName());
        user.setFirstName(userRequest.getFirstName());
        user.setGender(userRequest.getGender());
        user.setPronoun1(userRequest.getPronoun1());
        user.setPronoun2(userRequest.getPronoun2());
        user.setDateOfBirth(userRequest.getDateOfBirth());
        user.setLanguage(userRequest.getLanguage());
        user.setCountry(userRequest.getCountry());
        user.setCity(userRequest.getCity());
        user.setPhoneNumber(userRequest.getPhoneNumber());
        user.setProfileImagePath(userRequest.getProfileImagePath());
        user.setIsAdmin(userRequest.getIsAdmin());
        user.setIsDeleted(userRequest.getIsDeleted());

        userDAO.updateUser(user);
    }

    public void softDeleteUser(UUID userId) {
        userDAO.markUserAsDeleted(userId);
    }

    public void hardDeleteUser(UUID userId) {
        userDAO.deleteUser(userId);
    }

    public boolean isMedic(UUID userId) {
        JdbcTemplate jdbcTemplate = null;
        String query = "SELECT COUNT(*) FROM medic WHERE id = ?";
        Integer count = jdbcTemplate.queryForObject(query, new Object[]{userId}, Integer.class);
        return count != null && count > 0;
    }
}
