package com.medbuddy.medbuddy.repository.rowmappers;

import com.medbuddy.medbuddy.exceptions.DatabaseExceptions;
import com.medbuddy.medbuddy.models.MedicalHistoryEntry;
import com.medbuddy.medbuddy.utilitaries.DataConvertorUtil;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class MedicalHistoryRowMapper implements RowMapper<MedicalHistoryEntry> {

    @Override
    public MedicalHistoryEntry mapRow(final ResultSet rs, final int rowNum) throws SQLException {
        final MedicalHistoryEntry medicalHistory = new MedicalHistoryEntry();

        medicalHistory.setId(rs.getInt("ID"));
        medicalHistory.setMedicId(rs.getInt("medicId"));
        medicalHistory.setPatientId(rs.getInt("patientId"));
        medicalHistory.setDiagnosis(rs.getString("diagnosis"));
        medicalHistory.setPeriod(rs.getString("period"));
        medicalHistory.setTreatment(rs.getString("treatment"));
        try {
            medicalHistory.setDeleted(
                    DataConvertorUtil.turn0or1intoBoolean(
                            rs.getInt("isDeleted")
                    )
            );
        } catch (DatabaseExceptions.BooleanProblemInDatabase e) {
            System.err.println(e);
        }

        return medicalHistory;
    }
}
