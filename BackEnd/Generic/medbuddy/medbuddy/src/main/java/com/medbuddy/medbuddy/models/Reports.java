package com.medbuddy.medbuddy.models;

import lombok.Data;

@Data
public class Reports {
    private int id;
    private int reportedUser;
    private int reportedBy;
    private Boolean isDeleted;
    private String reportMessage;
}
