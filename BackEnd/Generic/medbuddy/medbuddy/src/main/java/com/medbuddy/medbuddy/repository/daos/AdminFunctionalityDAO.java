package com.medbuddy.medbuddy.repository.daos;

import com.medbuddy.medbuddy.exceptions.DatabaseExceptions;
import com.medbuddy.medbuddy.exceptions.NotFoundExceptions;
import com.medbuddy.medbuddy.models.Medic;
import com.medbuddy.medbuddy.repository.rowmappers.MedicRowMapper;
import com.medbuddy.medbuddy.repository.rowmappers.UserRowMapper;
import com.medbuddy.medbuddy.models.User;
import com.medbuddy.medbuddy.repository.rowmappers.ReportRowMapper;
import com.medbuddy.medbuddy.models.Report;
import com.medbuddy.medbuddy.utilitaries.DataConvertorUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;
import java.util.UUID;

@Repository
@Component
public class AdminFunctionalityDAO {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public AdminFunctionalityDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void reportUser(Report report) {
        jdbcTemplate.update("INSERT INTO reports(" +
                        "ID, " +
                        "REPORTEDUSER, " +
                        "REPORTEDBY, " +
                        "REPORTMESSAGE, " +
                        "TIMECREATED, " +
                        "ISDELETED" +
                        ") VALUES (?, ?, ?, ?, ?, ?)",
                report.getId().toString(),
                report.getReportedUser().toString(),
                report.getReportedBy().toString(),
                report.getReportMessage(),
                Date.valueOf(report.getTimeCreated()),
                DataConvertorUtil.turnBooleanInto0or1(report.isDeleted()));
    }

    public List<Report> getReports() {
        return jdbcTemplate.query("SELECT * FROM reports ORDER BY timeCreated DESC", new ReportRowMapper());
    }

    public List<User> getOldestUsers() {
        return jdbcTemplate.query(" SELECT * FROM appuser ORDER BY lastTimeLoggedIn ASC", new UserRowMapper());
    }

    public void allowMedic(UUID medicId) {
        int numberOfMedicsAllowed = jdbcTemplate.update("UPDATE medic SET isApproved=1 WHERE id = ?", medicId.toString());
        switch (numberOfMedicsAllowed) {
            case 0:
                throw new NotFoundExceptions.MedicNotFound("No medic with id = " + medicId + " was found");
            case 1:
                return;
            default:
                throw new DatabaseExceptions.NonUniqueIdentifier("Multiple medics found with medic id = " + medicId);
        }
    }

    public List<User> findUserByName(String firstName, String lastName) {
        if (firstName == null && lastName != null)
            return jdbcTemplate.query("SELECT * FROM appuser WHERE lastName = ?", new UserRowMapper(), lastName);
        if (lastName == null && firstName != null)
            return jdbcTemplate.query("SELECT * FROM appuser WHERE firstName = ?", new UserRowMapper(), firstName);
        return jdbcTemplate.query("SELECT * FROM appuser WHERE lastName = ? AND firstName = ?", new UserRowMapper(), lastName, firstName);
    }

    public List<Medic> getRequestingMedics() {
        return jdbcTemplate.query("SELECT * FROM medic WHERE isApproved = 0", new MedicRowMapper());
    }
}