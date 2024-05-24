package com.medbuddy.medbuddy.repository.daos;

import com.medbuddy.medbuddy.exceptions.NotFoundExceptions;
import com.medbuddy.medbuddy.models.MedicalHistoryEntry;
import com.medbuddy.medbuddy.repository.rowmappers.MedicalHistoryRowMapper;
import com.medbuddy.medbuddy.utilitaries.DataConvertorUtil;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public class MedicalHistoryDAO {

    private final JdbcTemplate jdbcTemplate;
    private final Logger logger;

    /**
     * Spring will insert the JdbcTemplate bean here
     * @param jdbcTemplate a bean inserted by Spring
     */
    @Autowired
    public MedicalHistoryDAO(JdbcTemplate jdbcTemplate) {
        logger = LogManager.getLogger("Database");
        this.jdbcTemplate = jdbcTemplate;
        jdbcTemplate.setQueryTimeout(10);
    }

    /**
     * get all entries for one user, with all their information
     * @param userId the user's UUID
     * @return a list of medical history entries
     */
    public List<MedicalHistoryEntry> getMedicalHistoryForAUser (UUID userId){
        try {
            return jdbcTemplate.query(
                    "SELECT * FROM MedicalHistory WHERE patientId = ?",
                    new MedicalHistoryRowMapper(),
                    userId.toString()
            );
        } catch (EmptyResultDataAccessException e) {
            throw new NotFoundExceptions.MedicalHistoryNotFound("No medical history found for user with id " + userId);
        }
    }

    /**
     * create a new entry in a user's medical history
     *
     * @param medicalHistoryEntry the model of the entry to be added
     */
    public void createMedicalHistoryEntry(MedicalHistoryEntry medicalHistoryEntry) {
        try {
            jdbcTemplate.update(
                    "INSERT INTO MedicalHistory VALUES(?, ?, ?, ?, ?, ?, ?)",
                    medicalHistoryEntry.getId().toString(),
                    medicalHistoryEntry.getMedicId().toString(),
                    medicalHistoryEntry.getPatientId().toString(),
                    medicalHistoryEntry.getDiagnosis(),
                    medicalHistoryEntry.getPeriod(),
                    medicalHistoryEntry.getTreatment(),
                    DataConvertorUtil.turnBooleanInto0or1(medicalHistoryEntry.isDeleted())
            );
        } catch (DataAccessException e) {
            logger.error("Error executing query: ", e.getMessage());
        }
    }
}