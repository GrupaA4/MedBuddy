package com.medbuddy.medbuddy.controllers.requestbodies;

import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class MessageRequestBody {
    private UUID id;
    private UUID senderId;
    private Date timeSent;
    private String message;
    private String imagePath;
    private Boolean isRead;
    private UUID repliesTo;
    private Boolean isFromMedBuddy;
}
