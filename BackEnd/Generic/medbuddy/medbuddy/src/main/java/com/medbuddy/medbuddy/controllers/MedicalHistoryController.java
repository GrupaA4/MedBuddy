package com.medbuddy.medbuddy.controllers;

import com.medbuddy.medbuddy.controllers.requestbodies.MedicalHistoryRequestBody;
import com.medbuddy.medbuddy.controllers.responsebodies.MedicalHistoryResponseBodies;
import com.medbuddy.medbuddy.models.MedicalHistoryEntry;
import com.medbuddy.medbuddy.services.MedicalHistoryService;
import com.medbuddy.medbuddy.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/medbuddy")
public class MedicalHistoryController {

    @Autowired
    private MedicalHistoryService medicalHistoryService;
    @Autowired
    private UserService userService;

    @GetMapping(value = "/getusermedicalhistory/{id}")
    public List<MedicalHistoryResponseBodies.MedicalHistoryBasicFields> getMedicalHistory(@PathVariable UUID id) {
        return medicalHistoryService.getUserMedicalHistory(id);
    }

    @PostMapping(value = "/addmedicalhistoryentry/{id}")
    public void createEntry(@PathVariable UUID id, @RequestBody MedicalHistoryRequestBody body) {
        MedicalHistoryEntry entry = new MedicalHistoryEntry(body);
        entry.setPatientId(id);
        medicalHistoryService.createNewMedicalHistoryEntry(entry);
    }

    @DeleteMapping(value = "/removemedicalhistoryentry/{id}")
    public void deleteEntry(@PathVariable UUID id) {
        medicalHistoryService.deleteEntry(id);
    }

    @PatchMapping(value = "/verifydiagnosis/{id}")
    public void changeDiagnosis(@PathVariable UUID id, @RequestBody MedicalHistoryRequestBody body) {
        medicalHistoryService.changeDiagnosis(id, body);
    }
}
