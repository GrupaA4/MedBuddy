package com.medbuddy.medbuddy.models;

import lombok.Data;

import java.util.UUID;

@Data
public class Report {
    private UUID id;
    private UUID reportedUser;
    private UUID reportedBy;
    private Boolean isDeleted;
    private String reportMessage;
    private String TimeCreated;
    private boolean Deleted;

}
