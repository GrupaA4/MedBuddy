package com.medbuddy.medbuddy.models;

import lombok.Data;

@Data
public class Message {
    private int id;
    private int senderId;
    private int conversationId;
    private String message;
    private String imagePath;
    private Boolean isRead;
    private int repliesTo;
    private Boolean isFromMedBuddy;
    private Boolean isDeleted;

    public Message(int id, int senderId, int conversationId, String message, String imagePath, Boolean isRead, int repliesTo, Boolean isFromMedBuddy, Boolean isDeleted) {
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