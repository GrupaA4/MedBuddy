package com.medbuddy.medbuddy.repository.daos;

import com.medbuddy.medbuddy.models.Medic;
import com.medbuddy.medbuddy.repository.rowmappers.MedicRowMapper;
import com.medbuddy.medbuddy.repository.rowmappers.UserRowMapper;
import com.medbuddy.medbuddy.models.User;
import com.medbuddy.medbuddy.repository.rowmappers.ReportRowMapper;
import com.medbuddy.medbuddy.models.Report;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
@Component
public class AdminFunctionalityDAO{
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public AdminFunctionalityDAO(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate=jdbcTemplate;
    }

    public List<User> getOldestUsers() {
        return jdbcTemplate.query("SELECT * FROM user ORDER BY lastTimeLoggedOn ASC", new UserRowMapper());
    }

    public List<User> findUserByName(String firstName, String lastName) throws Exception {
        if(firstName == null && lastName != null)
                return jdbcTemplate.query("SELECT * FROM user WHERE lastName = ?", new UserRowMapper(), lastName);
        if(lastName == null && firstName != null)
                return jdbcTemplate.query("SELECT * FROM user WHERE firstName = ?", new UserRowMapper(), firstName);
        return jdbcTemplate.query("SELECT * FROM user WHERE lastName = ? AND firstName = ?", new UserRowMapper(), lastName, firstName);
    }

    public int reportUser(UUID reportId, UUID currentUserId, UUID reportedUserId, String reportMessage) {
        return jdbcTemplate.update("INSERT INTO reports(ID, REPORTEDUSER, REPORTEDBY, REPORTMESSAGE) VALUES (?, ?, ?, ?)", reportId, reportedUserId, currentUserId, reportMessage);
    }

    public List<Report> getReports() {
        return jdbcTemplate.query("SELECT * FROM (SELECT * FROM reports ORDER BY timeCreated DESC) WHERE ROWNUM<=10", new ReportRowMapper());
    }

    public int allowMedic(UUID medicId)
    {
        return jdbcTemplate.update("UPDATE medic SET isApproved=1 WHERE id = ?", medicId);
    }

    public List<Medic> getRequestingMedics() {
        return jdbcTemplate.query("SELECT * FROM medic WHERE isApproved = 0", new MedicRowMapper());
    }
}