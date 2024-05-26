package com.medbuddy.medbuddy.models;

import lombok.Data;

import java.util.UUID;

@Data
public class MedicalHistoryEntry implements Entity{
    private UUID id;
    private UUID medicId;
    private UUID patientId;
    private String diagnosis;
    private String period;
    private String treatment;
    private boolean isDeleted;
}
