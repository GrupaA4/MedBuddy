package com.medbuddy.medbuddy.models;

import lombok.Getter;
import lombok.Setter;

public class Conversation {
    @Setter
    @Getter
    private int id;
    @Setter
    @Getter
    private int userId1;
    @Setter
    @Getter
    private int userId2;
    @Setter
    @Getter
    private int lastMessageId;
    private Boolean isDeleted;

    public Boolean getDeleted() {
        return isDeleted;
    }

    public void setDeleted(Boolean deleted) {
        isDeleted = deleted;
    }
}