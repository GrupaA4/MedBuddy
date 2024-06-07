package com.medbuddy.medbuddy.controllers.responsebodies;

import com.medbuddy.medbuddy.models.MedicalHistoryEntry;
import com.medbuddy.medbuddy.models.User;
import com.medbuddy.medbuddy.services.UserService;
import com.medbuddy.medbuddy.utilitaries.DataConvertorUtil;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.UUID;


public class MedicalHistoryResponseBodies {
/*
    @Data
    public static class GetMedicalHistory {
        private int numberOfMedicalHistoryEntriesReturned;
        private List<MedicalHistoryBasicFields> medicalHistoryEntries;

        public GetMedicalHistory(int numberOfMedicalHistoryEntriesReturned, List<MedicalHistoryBasicFields> medicalHistoryEntries) {
            this.numberOfMedicalHistoryEntriesReturned = numberOfMedicalHistoryEntriesReturned;
            this.medicalHistoryEntries = medicalHistoryEntries;
        }
    }
*/

    @Data
    public static class MedicalHistoryBasicFields {
        private UUID id;
        private String diagnose;
        private String treatment;
        private String name;
        private String date_treatment;

        public MedicalHistoryBasicFields(UserService userService, MedicalHistoryEntry medicalHistoryEntry) {
            this.id = medicalHistoryEntry.getId();
            this.diagnose = medicalHistoryEntry.getDiagnosis();
            this.treatment = medicalHistoryEntry.getTreatment();
            UUID medicId = medicalHistoryEntry.getMedicId();
            if(medicId == UUID.fromString("dfe6b8e7-b7a5-42bc-9fba-27dfc0b165bc")) {
                this.name = "Medbuddy";
            } else {
                UUID userIdOfMedic = userService.getUserIdOfMedic(medicId);
                User medic = userService.getUser(userIdOfMedic);
                this.name = "Dr. " + medic.getLastName() + " " + medic.getFirstName();
            }
            this.date_treatment = DataConvertorUtil.turnLocalDateToSlashDate(medicalHistoryEntry.getDate_diagnosis());
        }
    }
}
