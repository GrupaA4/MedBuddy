package com.medbuddy.medbuddy.repository.rowmappers;

import com.medbuddy.medbuddy.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.UUID;

public class UserRowMapper implements RowMapper<User> {
    @Override
    public User mapRow(ResultSet rs, int rowNum) throws SQLException {
        User user = new User();
        user.setId(UUID.fromString(rs.getString("id")));
        user.setEmail(rs.getString("email"));
        user.setPassword(rs.getString("password"));
        user.setLastName(rs.getString("lastName"));
        user.setFirstName(rs.getString("firstName"));
        user.setGender(rs.getBoolean("gender"));
        user.setPronoun1(rs.getString("pronoun1"));
        user.setPronoun2(rs.getString("pronoun2"));
        user.setDateOfBirth(rs.getDate("dateOfBirth"));
        user.setLanguage(rs.getString("language"));
        user.setCountry(rs.getString("country"));
        user.setCity(rs.getString("city"));
        user.setPhoneNumber(rs.getInt("phoneNumber"));
        user.setProfileImagePath(rs.getString("profileImagePath"));
        user.setIsAdmin(rs.getBoolean("isAdmin"));
        user.setIsDeleted(rs.getBoolean("isDeleted"));
        return user;
    }
}
