package com.medbuddy.medbuddy.controllers.responsebodies;

import com.medbuddy.medbuddy.models.MedicalHistoryEntry;
import lombok.Data;

import java.util.List;
import java.util.UUID;


public class MedicalHistoryResponseBodies {
    @Data
    public static class GetMedicalHistory {
        private int numberOfMedicalHistoryEntriesReturned;
        private List<MedicalHistoryBasicFields> medicalHistoryEntries;

        public GetMedicalHistory(int numberOfMedicalHistoryEntriesReturned, List<MedicalHistoryBasicFields> medicalHistoryEntries) {
            this.numberOfMedicalHistoryEntriesReturned = numberOfMedicalHistoryEntriesReturned;
            this.medicalHistoryEntries = medicalHistoryEntries;
        }
    }

    @Data
    public static class MedicalHistoryBasicFields {
        private UUID medicId;
        private String diagnosis;
        private String period;
        private String treatment;

        public MedicalHistoryBasicFields(MedicalHistoryEntry entry) {
            medicId = entry.getMedicId();
            diagnosis = entry.getDiagnosis();
            period = entry.getPeriod();
            treatment = entry.getTreatment();
        }
    }
}
