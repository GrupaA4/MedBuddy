package com.medbuddy.medbuddy.models;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@NoArgsConstructor
@Data
public class Conversation implements Entity{
    private UUID id;
    private UUID userId1;
    private UUID userId2;
    private UUID lastMessageId;
    private boolean isDeleted;

    public Conversation(UUID id, UUID userId1, UUID userId2, UUID lastMessageId, Boolean isDeleted) {
        this.id = id;
        this.userId1 = userId1;
        this.userId2 = userId2;
        this.lastMessageId = lastMessageId;
        this.isDeleted = isDeleted;
    }
}