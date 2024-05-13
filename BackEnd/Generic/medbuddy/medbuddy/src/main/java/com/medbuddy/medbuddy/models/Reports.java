package com.medbuddy.medbuddy.models;

import lombok.Data;

import java.util.UUID;

@Data
public class Reports {
    private UUID id;
    private UUID reportedUser;
    private UUID reportedBy;
    private Boolean isDeleted;
    private String reportMessage;
}
