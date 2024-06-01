package com.medbuddy.medbuddy.repository.rowmappers;

import com.medbuddy.medbuddy.models.Notification;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;

public class NotificationsRowMapper implements RowMapper<Notification> {
    @Override
    public Notification mapRow(ResultSet rs, int rowNum) throws SQLException {
        Notification notification = new Notification();
        notification.setId(UUID.fromString(rs.getString("id")));
        notification.setMedicId(UUID.fromString(rs.getString("medicId")));
        notification.setPatientId(UUID.fromString(rs.getString("patientId")));
        notification.setDiagnosis(rs.getString("diagnosis"));
        return notification;
    }
}
