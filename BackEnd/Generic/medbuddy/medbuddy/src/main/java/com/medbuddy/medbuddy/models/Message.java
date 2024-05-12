package com.medbuddy.medbuddy.models;

import lombok.Data;

import java.util.UUID;

@Data
public class Message {
    private UUID id;
    private UUID senderId;
    private UUID conversationId;
    private String message;
    private String imagePath;
    private Boolean isRead;
    private int repliesTo;
    private Boolean isFromMedBuddy;
    private Boolean isDeleted;

    public Message(UUID id, UUID senderId, UUID conversationId, String message, String imagePath, Boolean isRead, int repliesTo, Boolean isFromMedBuddy, Boolean isDeleted) {
        this.id = id;
        this.senderId = senderId;
        this.conversationId = conversationId;
        this.message = message;
        this.imagePath = imagePath;
        this.isRead = isRead;
        this.repliesTo = repliesTo;
        this.isFromMedBuddy = isFromMedBuddy;
        this.isDeleted = isDeleted;
    }
}