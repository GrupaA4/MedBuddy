package com.medbuddy.medbuddy.repository.rowmappers;

import com.medbuddy.medbuddy.models.User;
import com.medbuddy.medbuddy.utilitaries.DataConvertorUtil;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
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
        user.setGender(DataConvertorUtil.turn0or1intoBoolean(rs.getInt("gender")));
        user.setPronoun1(rs.getString("pronoun1"));
        user.setPronoun2(rs.getString("pronoun2"));
        user.setDateOfBirth(rs.getDate("dateOfBirth").toLocalDate());
        user.setLanguage(rs.getString("language"));
        user.setCountry(rs.getString("country"));
        user.setCity(rs.getString("city"));
        user.setPhoneNumber(rs.getString("phoneNumber"));
        user.setProfileImageNumber(rs.getInt("profileImageNumber"));
        user.setImageExtension(rs.getString("imageExtension"));
        user.setLastTimeLoggedIn(rs.getDate("lastTimeLoggedIn").toLocalDate());
        user.setAdmin(DataConvertorUtil.turn0or1intoBoolean(rs.getInt("isAdmin")));
        user.setDeleted(DataConvertorUtil.turn0or1intoBoolean(rs.getInt("isDeleted")));
        return user;
    }
}
