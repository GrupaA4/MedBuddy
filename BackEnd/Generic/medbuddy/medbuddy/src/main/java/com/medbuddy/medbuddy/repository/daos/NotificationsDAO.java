package com.medbuddy.medbuddy.repository.daos;

import com.medbuddy.medbuddy.models.Notification;
import com.medbuddy.medbuddy.repository.rowmappers.NotificationsRowMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public class NotificationsDAO {
    @Autowired
    JdbcTemplate jdbcTemplate;

    public void addNotification(Notification notification) {
        String sql = "INSERT INTO AppNotifications VALUES(?, ?, ?, ?)";
        jdbcTemplate.update(sql,
                notification.getId().toString(),
                notification.getMedicId().toString(),
                notification.getPatientId().toString(),
                notification.getDiagnosis());
    }

    public List<Notification> getAllNotifications(UUID id) {
        String sql = "SELECT * FROM AppNotifications WHERE medicId = ?";
        return jdbcTemplate.query(sql, new NotificationsRowMapper(), id.toString());
    }

    public void deleteNotification(UUID notificationId) {
        String sql = "DELETE FROM AppNotifications WHERE id = ?";
        jdbcTemplate.update(sql, notificationId.toString());
    }
}
