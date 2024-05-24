package com.medbuddy.medbuddy.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Message implements Entity{
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
}