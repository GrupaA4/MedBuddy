package com.medbuddy.medbuddy.repository.daos;

import com.medbuddy.medbuddy.exceptions.DatabaseExceptions;
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

import java.sql.Date;
import java.time.LocalDate;
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
                    Date.valueOf(medicalHistoryEntry.getDate_diagnosis()),
                    medicalHistoryEntry.getTreatment(),
                    DataConvertorUtil.turnBooleanInto0or1(medicalHistoryEntry.isDeleted())
            );
        } catch (DataAccessException e) {
            logger.error("Error executing query: ", e.getMessage());
        }
    }

    public void deleteEntry(UUID entryId) {
        String sql = "DELETE FROM MedicalHistory WHERE id = ?";
        int numberOfEntriesDeleted = jdbcTemplate.update(sql, entryId.toString());
        switch (numberOfEntriesDeleted) {
            case 0:
                throw new NotFoundExceptions.MedicalHistoryNotFound("No medical history with id " + entryId + " was found");
            case 1:
                return;
            default:
                throw new DatabaseExceptions.NonUniqueIdentifier("More medical historyEntries with the same id (" + entryId + ") were found");
        }
    }

    public void markEntriesAsDeleted(UUID userId) {
        String sql = "UPDATE MedicalHistory SET isDeleted = 1 WHERE patientId = ?";
        jdbcTemplate.update(sql, userId.toString());
    }

    public void changeMedicalHistoryEntry(UUID entryId, String diagnosis, String treatment, LocalDate now) {
        String sql = "UPDATE MedicalHistory SET diagnosis = ?, treatment = ?, diagnosisDate = ? WHERE id = ?";
        jdbcTemplate.update(sql,
                diagnosis,
                treatment,
                Date.valueOf(now),
                entryId.toString());
    }
}