package com.medbuddy.medbuddy.models;

import lombok.Getter;
import lombok.Setter;

public class Message {
    @Setter
    @Getter
    private int id;
    @Setter
    @Getter
    private int senderId;
    @Setter
    @Getter
    private int conversationId;
    @Setter
    @Getter
    private String message;
    @Setter
    @Getter
    private String imagePath;
    private Boolean isRead;
    @Setter
    @Getter
    private int repliesTo;
    private Boolean isFromMedBuddy;
    private Boolean isDeleted;

    public Boolean getRead() {
        return isRead;
    }

    public void setRead(Boolean read) {
        isRead = read;
    }

    public Boolean getFromMedBuddy() {
        return isFromMedBuddy;
    }

    public void setFromMedBuddy(Boolean fromMedBuddy) {
        isFromMedBuddy = fromMedBuddy;
    }

    public Boolean getDeleted() {
        return isDeleted;
    }

    public void setDeleted(Boolean deleted) {
        isDeleted = deleted;
    }
}
