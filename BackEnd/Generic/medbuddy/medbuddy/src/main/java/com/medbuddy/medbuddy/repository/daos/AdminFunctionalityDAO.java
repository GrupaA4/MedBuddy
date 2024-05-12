package com.medbuddy.medbuddy.repository.daos;

import com.medbuddy.medbuddy.repository.rowmappers.UserRowMapper;
import com.medbuddy.medbuddy.models.User;
import com.medbuddy.medbuddy.repository.rowmappers.ReportRowMapper;
import com.medbuddy.medbuddy.models.Report;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class AdminFunctionalityDAO{
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public AdminFunctionalityDAO(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate=jdbcTemplate;
    }

    public List<User> getOldestUsers(int fromId, int toId) {
        return jdbcTemplate.query("SELECT id FROM user WHERE id>=fromId AND id<=toId", new UserRowMapper());
    }

    public int reportUser(int currentUserId, int reportedUserId, String reportMessage) {
        return jdbcTemplate.update("INSERT INTO reports(REPORTEDUSER, REPORTEDBY, REPORTMESSAGE) VALUES (?, ?, ?)", reportedUserId, currentUserId, reportMessage);
    }

    public List<Report> getReports(int fromId, int toId) {
        return jdbcTemplate.query("SELECT reportedUser, reportedBy, reportMessage FROM reports WHERE id>=fromId AND id<=toId", new ReportRowMapper());
    }

    public boolean allowMedic(int medicId)
    {
        // if(isValidCertificate)
            return true;
        // else
        //  return false;
    }

}
