package com.medbuddy.medbuddy.controllers;

import com.medbuddy.medbuddy.controllers.requestbodies.MedicalHistoryRequestBody;
import com.medbuddy.medbuddy.controllers.responsebodies.MedicalHistoryResponseBodies;
import com.medbuddy.medbuddy.services.MedicalHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/medbuddy")
public class MedicalHistoryController {

    @Autowired
    private MedicalHistoryService service;

    @GetMapping(value = "/getusermedicalhistory/{id}")
    public MedicalHistoryResponseBodies.GetMedicalHistory getMedicalHistory(@PathVariable UUID id) {
        List<MedicalHistoryResponseBodies.MedicalHistoryBasicFields> entries = service.getUserMedicalHistory(id);
        return new MedicalHistoryResponseBodies.GetMedicalHistory(entries.size(), entries);
    }

    @PostMapping(value = "/addmedicalhistoryentry/{id}")
    public void createEntry(@PathVariable UUID id, @RequestBody MedicalHistoryRequestBody body) {
        service.createNewMedicalHistoryEntry(
                UUID.fromString("4ac54007-cc86-4a68-beb3-12a73b9a7d0b"),
                id,
                body.getDiagnosis(),
                body.getPeriod(),
                body.getTreatment()
                );
    }

    @DeleteMapping(value = "/removemedicalhistoryentry/{id}")
    public void deleteEntry(@PathVariable UUID id) {
        service.deleteEntry(id);
    }
}
