package com.medbuddy.medbuddy.models;

import lombok.Data;

@Data
public class MedicalHistoryEntry {
    private int id;
    private int medicId;
    private int patientId;
    private String diagnosis;
    private String period;
    private String treatment;
    private boolean isDeleted;
}
