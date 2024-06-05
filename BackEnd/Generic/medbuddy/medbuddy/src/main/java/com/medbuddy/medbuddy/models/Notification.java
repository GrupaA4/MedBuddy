package com.medbuddy.medbuddy.models;

import lombok.Data;

import java.util.UUID;

@Data
public class Notification {
    private UUID id;
    private UUID medicId;
    private UUID patientId;
    private String diagnosis;
}
