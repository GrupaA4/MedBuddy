package com.medbuddy.medbuddy.services;

import com.medbuddy.medbuddy.controllers.responsebodies.MedicalHistoryResponseBodies;
import com.medbuddy.medbuddy.models.MedicalHistoryEntry;
import com.medbuddy.medbuddy.repository.daos.MedicalHistoryDAO;
import com.medbuddy.medbuddy.utilitaries.SecurityUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class MedicalHistoryService {

    @Autowired
    private MedicalHistoryDAO medicalHistoryRepository;

    public List<MedicalHistoryResponseBodies.MedicalHistoryBasicFields> getUserMedicalHistory(UUID userId) {
        List<MedicalHistoryEntry> entries = medicalHistoryRepository.getMedicalHistoryForAUser(userId);
        List<MedicalHistoryResponseBodies.MedicalHistoryBasicFields> entriesWithBasicFields = new ArrayList<>();
        for(var entry : entries) {
            entriesWithBasicFields.add(new MedicalHistoryResponseBodies.MedicalHistoryBasicFields(entry));
        }
        return entriesWithBasicFields;
    }

    public void createNewMedicalHistoryEntry(UUID medicId, UUID patientId, String diagnosis, String period, String treatment) {
        MedicalHistoryEntry entry = new MedicalHistoryEntry();
        entry.setId(SecurityUtil.getNewId());
        entry.setMedicId(medicId);
        entry.setPatientId(patientId);
        entry.setDiagnosis(diagnosis);
        entry.setPeriod(period);
        entry.setTreatment(treatment);
        entry.setDeleted(false);
        medicalHistoryRepository.createMedicalHistoryEntry(entry);
    }

    public void deleteEntry(UUID entryId) {
        medicalHistoryRepository.deleteEntry(entryId);
    }
}
