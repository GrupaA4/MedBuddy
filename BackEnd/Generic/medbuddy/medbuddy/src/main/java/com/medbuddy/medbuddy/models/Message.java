package com.medbuddy.medbuddy.models;

import com.medbuddy.medbuddy.controllers.requestbodies.MessageRequestBodies;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Message{
    private String message;
    /*
    private UUID id;
    private UUID senderId;
    private UUID conversationId;
    private String message;
    private Integer imageNumber;
    private String imageExtension;
    private boolean isRead;
    private UUID repliesTo;
    private LocalDate timeSent;
    private boolean isFromMedBuddy;
    private boolean isDeleted;

    public Message(MessageRequestBodies.MessageBody body) {
        message = body.getMessage();
        imageExtension = body.getImageExtension();
        repliesTo = body.getRepliesTo();
        isFromMedBuddy = body.isFromMedbuddy();
    }
    */
}