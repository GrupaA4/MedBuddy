package com.medbuddy.medbuddy.repository.daos;

import com.medbuddy.medbuddy.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.UUID;

@Repository
public class UserDAO {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public UserDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public boolean loginUser(String email, String password) {
        // check if the email and password match
        String sql = "SELECT COUNT(*) FROM appuser WHERE email = ? AND password = ?";
        int count = jdbcTemplate.queryForObject(sql, Integer.class, email, password);
        return count == 1;
    }

    public UUID getUserId(String email) {
        // implementation for getting user ID by email
        String sql = "SELECT id FROM appuser WHERE email = ?";
        return jdbcTemplate.queryForObject(sql, UUID.class, email);
    }

    public void signupUser(User user) {
        // implementation for user signup
        String sql = "INSERT INTO appuser (id, email, password, lastName, firstName, gender, pronoun1, pronoun2, dateOfBirth, language, country, city, phoneNumber, profileImagePath, isAdmin, isDeleted) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql, UUID.randomUUID().toString(), user.getEmail(), user.getPassword(), user.getLastName(), user.getFirstName(), user.getGender(),
                user.getPronoun1(), user.getPronoun2(), user.getDateOfBirth(), user.getLanguage(), user.getCountry(),
                user.getCity(), user.getPhoneNumber(), user.getProfileImagePath(), user.getIsAdmin(), user.getIsDeleted());
    }

    public User getUserById(UUID id) {
        String sql = "SELECT * FROM appuser WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, User.class, id);
    }

    public void updateUser(User user) {
        String sql = "UPDATE appuser SET email = ?, password = ?, lastName = ?, firstName = ?, gender = ?, pronoun1 = ?, pronoun2 = ?, dateOfBirth = ?, " +
                "language = ?, country = ?, city = ?, phoneNumber = ?, profileImagePath = ?, isAdmin = ?, isDeleted = ? WHERE id = ?";
        jdbcTemplate.update(sql, user.getEmail(), user.getPassword(), user.getLastName(), user.getFirstName(),
                user.getGender(), user.getPronoun1(), user.getPronoun2(), user.getDateOfBirth(),
                user.getLanguage(), user.getCountry(), user.getCity(), user.getPhoneNumber(),
                user.getProfileImagePath(), user.getIsAdmin(), user.getIsDeleted(), user.getId());
    }

    public void deleteUser(UUID id) {
        String sql = "DELETE FROM appuser WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }

    public void markUserAsDeleted(UUID id) {
        String sql = "UPDATE appuser SET isDeleted = true WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }

}
