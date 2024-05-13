package com.medbuddy.medbuddy.repository.rowmappers;

import com.medbuddy.medbuddy.models.MedicalHistoryEntry;
import com.medbuddy.medbuddy.models.Report;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ReportRowMapper implements RowMapper<Report> {
    @Override
    public Report mapRow(ResultSet rs, int rowNum) throws SQLException {
        Report report = new Report();
        report.setId(rs.getInt(1));
        report.setReportedUser(rs.getInt(2));
        report.setReportedBy(rs.getInt(3));
        report.setReportMessage(rs.getString(4));
        report.setTimeCreated(rs.getString(5));
        report.setDeleted(rs.getBoolean(6));
        return report;
    }
}
