package com.medbuddy.medbuddy.repository.rowmappers;

import com.medbuddy.medbuddy.models.User;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UserRowMapper implements RowMapper<User> {
    @Override
    public User mapRow(ResultSet rs, int rowNum) throws SQLException {
        return null;
    }
}
