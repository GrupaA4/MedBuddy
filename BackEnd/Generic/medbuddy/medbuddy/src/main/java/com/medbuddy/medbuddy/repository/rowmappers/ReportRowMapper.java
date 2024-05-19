package com.medbuddy.medbuddy.repository.rowmappers;

import com.medbuddy.medbuddy.models.MedicalHistoryEntry;
import com.medbuddy.medbuddy.models.Report;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;

public class ReportRowMapper implements RowMapper<Report> {
    @Override
    public Report mapRow(ResultSet rs, int rowNum) throws SQLException {
        Report report = new Report();
        report.setId(UUID.fromString(rs.getString(1)));
        report.setReportedUser(UUID.fromString(rs.getString(2)));
        report.setReportedBy(UUID.fromString(rs.getString(3)));
        report.setReportMessage(rs.getString(4));
        report.setTimeCreated(rs.getDate(5).toLocalDate());
        report.setIsDeleted(rs.getBoolean(6));
        return report;
    }
}
