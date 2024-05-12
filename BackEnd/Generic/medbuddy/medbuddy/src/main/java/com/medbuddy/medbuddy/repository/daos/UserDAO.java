package com.medbuddy.medbuddy.repository.daos;

import com.medbuddy.medbuddy.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class UserDAO {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public UserDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void loginUser(String email, String password) {
        //check if the email and password match
        String sql = "SELECT COUNT(*) FROM appuser WHERE email = ? AND password = ?";

        // execute the query
        int count = jdbcTemplate.queryForObject(sql, Integer.class, email, password);

        // check if a user with the provided email and password exists
        if (count == 1) {
            System.out.println("Login successful!");
        } else {
            System.out.println("Invalid email or password. Please try again.");
        }
    }

    public int getUserId(String email) {
        // implementation for getting user ID by email
        String sql = "SELECT id FROM appuser WHERE email = ?";
        return jdbcTemplate.queryForObject(sql, Integer.class, email);
    }

    public void signupUser(User user) {
        // implementation for user signup
        String sql = "INSERT INTO appuser (email, password, lastName, firstName, gender, pronoun1, pronoun2, dateOfBirth, language, country, city, phoneNumber, profileImagePath, isAdmin, isDeleted) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql, user.getEmail(), user.getPassword(), user.getLastName(), user.getFirstName(), user.getGender(),
                user.getPronoun1(), user.getPronoun2(), user.getDateOfBirth(), user.getLanguage(), user.getCountry(),
                user.getCity(), user.getPhoneNumber(), user.getProfileImagePath(), user.getIsAdmin(), user.getIsDeleted());
    }


}
