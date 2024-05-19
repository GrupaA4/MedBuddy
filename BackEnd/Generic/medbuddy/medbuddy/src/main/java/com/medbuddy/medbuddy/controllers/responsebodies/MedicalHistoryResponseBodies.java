package com.medbuddy.medbuddy.controllers.responsebodies;

import com.medbuddy.medbuddy.models.MedicalHistoryEntry;
import lombok.Data;

import java.util.List;


public class MedicalHistoryResponseBodies {
    @Data
    public static class GetMedicalHistory {
        private int numberOfMedicalHistoryEntriesReturned;
        private List<MedicalHistoryEntry> medicalHistoryEntries;

        public GetMedicalHistory(int numberOfMedicalHistoryEntriesReturned, List<MedicalHistoryEntry> medicalHistoryEntries) {
            this.numberOfMedicalHistoryEntriesReturned = numberOfMedicalHistoryEntriesReturned;
            this.medicalHistoryEntries = medicalHistoryEntries;
        }
    }
}
