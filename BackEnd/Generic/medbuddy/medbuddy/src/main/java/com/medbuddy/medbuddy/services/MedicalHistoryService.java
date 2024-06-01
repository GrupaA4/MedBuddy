package com.medbuddy.medbuddy.services;

import com.medbuddy.medbuddy.controllers.requestbodies.MedicalHistoryRequestBody;
import com.medbuddy.medbuddy.controllers.responsebodies.MedicalHistoryResponseBodies;
import com.medbuddy.medbuddy.models.MedicalHistoryEntry;
import com.medbuddy.medbuddy.repository.daos.MedicalHistoryDAO;
import com.medbuddy.medbuddy.utilitaries.SecurityUtil;
import com.medbuddy.medbuddy.utilitaries.validators.EntityValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class MedicalHistoryService {

    @Autowired
    UserService userService;
    @Autowired
    private MedicalHistoryDAO medicalHistoryRepository;

    public List<MedicalHistoryResponseBodies.MedicalHistoryBasicFields> getUserMedicalHistory(UUID userId) {
        List<MedicalHistoryEntry> entries = medicalHistoryRepository.getMedicalHistoryForAUser(userId);
        List<MedicalHistoryResponseBodies.MedicalHistoryBasicFields> entriesWithBasicFields = new ArrayList<>();
        for(var entry : entries) {
            if(EntityValidator.validate(entry)) {
                entriesWithBasicFields.add(new MedicalHistoryResponseBodies.MedicalHistoryBasicFields(userService, entry));
            }
        }
        return entriesWithBasicFields;
    }

    public void createNewMedicalHistoryEntry(MedicalHistoryEntry entry) {
        entry.setId(SecurityUtil.getNewId());
        entry.setMedicId(
                userService.getMedicProfile(
                        userService.getUserIdByEmail(
                                SecurityUtil.getEmail()
                        )
                ).getMedicId()
        );
        entry.setDate_diagnosis(LocalDate.now());
        entry.setDeleted(false);
        medicalHistoryRepository.createMedicalHistoryEntry(entry);
    }

    public void deleteEntry(UUID entryId) {
        medicalHistoryRepository.deleteEntry(entryId);
    }

    public void changeDiagnosis(UUID entryId, MedicalHistoryRequestBody body) {
        medicalHistoryRepository.changeMedicalHistoryEntry(entryId, body.getDiagnosis(), body.getTreatment(), LocalDate.now());
    }
}
