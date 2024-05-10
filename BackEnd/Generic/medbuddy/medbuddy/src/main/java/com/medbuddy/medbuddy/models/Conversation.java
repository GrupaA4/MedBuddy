package com.medbuddy.medbuddy.models;

import lombok.Data;

@Data
public class Conversation {
    private int id;
    private int userId1;
    private int userId2;
    private int lastMessageId;
    private Boolean isDeleted;

    public Conversation(int id, int userId1, int userId2, int lastMessageId, Boolean isDeleted) {
        this.id = id;
        this.userId1 = userId1;
        this.userId2 = userId2;
        this.lastMessageId = lastMessageId;
        this.isDeleted = isDeleted;
    }
}