package com.medbuddy.medbuddy.controllers;

import com.medbuddy.medbuddy.controllers.requestbodies.MedicalHistoryRequestBody;
import com.medbuddy.medbuddy.models.MedicalHistoryEntry;
import com.medbuddy.medbuddy.services.MedicalHistoryService;
import com.medbuddy.medbuddy.utilitaries.SecurityUtil;
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
    public List<MedicalHistoryEntry> getMedicalHistory(@PathVariable UUID id) {
        return service.getUserMedicalHistory(id);
    }

    @PostMapping(value = "/addmedicalhistoryentry/{id}")
    public void createEntry(@PathVariable UUID id, @RequestBody MedicalHistoryRequestBody body) {
        service.createNewMedicalHistoryEntry(
                /*authenticated user*/SecurityUtil.getNewId(),
                id,
                body.getDiagnosis(),
                body.getPeriod(),
                body.getTreatment()
                );
    }
}
