package com.medbuddy.medbuddy.models;

import lombok.Data;

import java.time.LocalDate;
import java.util.UUID;

@Data
public class Report {
    private UUID id;
    private UUID reportedUser;
    private UUID reportedBy;
    private String reportMessage;
    private LocalDate timeCreated;
    private Boolean isDeleted;
}
