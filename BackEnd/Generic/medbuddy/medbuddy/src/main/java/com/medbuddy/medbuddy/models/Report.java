package com.medbuddy.medbuddy.models;

import lombok.Data;

import java.time.LocalDate;
import java.util.UUID;

@Data
public class Report implements Entity{
    private UUID id;
    private UUID reportedUser;
    private UUID reportedBy;
    private String reportMessage;
    private LocalDate timeCreated;
    private boolean isDeleted;
}
