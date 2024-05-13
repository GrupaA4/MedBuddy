package com.medbuddy.medbuddy.repository.rowmappers;

import com.medbuddy.medbuddy.models.Medic;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class MedicRowMapper implements RowMapper<Medic> {
    @Override
    public Medic mapRow(ResultSet rs, int rowNum) throws SQLException {
        return null;
    }
}
