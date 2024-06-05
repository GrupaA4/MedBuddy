package com.medbuddy.medbuddy.repository.rowmappers;

import com.medbuddy.medbuddy.exceptions.DatabaseExceptions;
import com.medbuddy.medbuddy.models.MedicalHistoryEntry;
import com.medbuddy.medbuddy.utilitaries.DataConvertorUtil;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;

public class MedicalHistoryRowMapper implements RowMapper<MedicalHistoryEntry> {

    private final Logger logger;

    public MedicalHistoryRowMapper() {
        logger = LogManager.getLogger("Database");
    }

    @Override
    public MedicalHistoryEntry mapRow(final ResultSet rs, final int rowNum) throws SQLException {
        final MedicalHistoryEntry medicalHistory = new MedicalHistoryEntry();

        medicalHistory.setId(UUID.fromString(rs.getString("ID")));
        medicalHistory.setMedicId(UUID.fromString(rs.getString("medicId")));
        medicalHistory.setPatientId(UUID.fromString(rs.getString("patientId")));
        medicalHistory.setDiagnosis(rs.getString("diagnosis"));
        medicalHistory.setDate_diagnosis(rs.getDate("diagnosisDate").toLocalDate());
        medicalHistory.setTreatment(rs.getString("treatment"));
        try {
            medicalHistory.setDeleted(
                    DataConvertorUtil.turn0or1intoBoolean(
                            rs.getInt("isDeleted")
                    )
            );
        } catch (DatabaseExceptions.BooleanProblemInDatabase e) {
            logger.error("Problem with boolean in database: {}", e.getMessage());
        }

        return medicalHistory;
    }
}
