package org.example;

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

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getSenderId() {
        return senderId;
    }

    public void setSenderId(int senderId) {
        this.senderId = senderId;
    }

    public int getConversationId() {
        return conversationId;
    }

    public void setConversationId(int conversationId) {
        this.conversationId = conversationId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public Boolean getRead() {
        return isRead;
    }

    public void setRead(Boolean read) {
        isRead = read;
    }

    public int getRepliesTo() {
        return repliesTo;
    }

    public void setRepliesTo(int repliesTo) {
        this.repliesTo = repliesTo;
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
