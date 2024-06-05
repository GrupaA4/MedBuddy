package com.medbuddy.medbuddy.models;

import com.medbuddy.medbuddy.controllers.requestbodies.MedicalHistoryRequestBody;
import com.medbuddy.medbuddy.utilitaries.DataConvertorUtil;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@NoArgsConstructor
@Data
public class MedicalHistoryEntry implements Entity{
    private UUID id;
    private UUID medicId;
    private UUID patientId;
    private String diagnosis;
    private LocalDate date_diagnosis;
    private String treatment;
    private boolean isDeleted;

    public MedicalHistoryEntry(MedicalHistoryRequestBody body) {
        this.diagnosis = body.getDiagnosis();
        this.treatment = body.getTreatment();
    }
}
