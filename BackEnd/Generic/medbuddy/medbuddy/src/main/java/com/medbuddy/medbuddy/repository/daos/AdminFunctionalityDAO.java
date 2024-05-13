package com.medbuddy.medbuddy.repository.daos;

import com.medbuddy.medbuddy.models.Medic;
import com.medbuddy.medbuddy.repository.rowmappers.UserRowMapper;
import com.medbuddy.medbuddy.models.User;
import com.medbuddy.medbuddy.repository.rowmappers.ReportRowMapper;
import com.medbuddy.medbuddy.models.Report;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public class AdminFunctionalityDAO{
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public AdminFunctionalityDAO(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate=jdbcTemplate;
    }

    public List<User> getOldestUsers() {
        return jdbcTemplate.query("SELECT * FROM user ORDER BY lastTimeLoggedOn ASC", new UserRowMapper());
    }

    public List<User> findUserByName(String username) throws Exception {
        if(!username.contains("+") || (username.startsWith("+") && username.endsWith("+")))
            throw new Exception("Invalid format. (Make custom exception: findUserByName)");
        String[] nameParts = username.split("\\+");

        if (nameParts.length > 2)
            throw new Exception("Invalid format, should only have 2 parts. (Make custom exception: findUserByName)");

        String firstName = null;
        String lastName = null;

        if(nameParts.length == 1){
            if(username.startsWith("+")){
                lastName=nameParts[0];
                return jdbcTemplate.query("SELECT * FROM user WHERE lastName = ?", lastName, new UserRowMapper());
            }
            else{
                firstName = nameParts[0];
                return jdbcTemplate.query("SELECT * FROM user WHERE firstName = ?", firstName, new UserRowMapper());
            }
        }
        else{
            lastName = nameParts[0];
            firstName = nameParts[1];
            return jdbcTemplate.query("SELECT * FROM user WHERE lastName = ? AND firstName = ?", lastName, firstName, new UserRowMapper());
        }
    }

    public int reportUser(UUID currentUserId, UUID reportedUserId, String reportMessage) {
        return jdbcTemplate.update("INSERT INTO reports(REPORTEDUSER, REPORTEDBY, REPORTMESSAGE) VALUES (?, ?, ?)", reportedUserId, currentUserId, reportMessage);
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
