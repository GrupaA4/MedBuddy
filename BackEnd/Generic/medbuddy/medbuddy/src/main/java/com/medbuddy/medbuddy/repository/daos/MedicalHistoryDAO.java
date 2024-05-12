package com.medbuddy.medbuddy.repository.daos;

import com.medbuddy.medbuddy.models.MedicalHistoryEntry;
import com.medbuddy.medbuddy.repository.rowmappers.MedicalHistoryRowMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class MedicalHistoryDAO {
    private final JdbcTemplate jdbcTemplate;

    /**
     * Spring will insert the JdbcTemplate bean here
     *
     * @param jdbcTemplate a bean inserted by Spring
     */
    @Autowired
    public MedicalHistoryDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<MedicalHistoryEntry> getMedicalHistoryForAUser(int userId) {
        return jdbcTemplate.query(
                "SELECT * FROM MedicalHistory WHERE userId = ?",
                new MedicalHistoryRowMapper(),
                userId
        );
    }

    /*public int createMedicalHistoryEntry(MedicalHistoryEntry medicalHistoryEntry) {
        return jdbcTemplate.update(
                "INSERT INTO MedicalHistory()"
        )
    }*/
}