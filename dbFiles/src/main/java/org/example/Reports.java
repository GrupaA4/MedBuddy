package org.example;

public class Reports {
    private int id;
    private int reportedUser;
    private int reportedBy;
    private Boolean isDeleted;
    private String reportMessage;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getReportedUser() {
        return reportedUser;
    }

    public void setReportedUser(int reportedUser) {
        this.reportedUser = reportedUser;
    }

    public int getReportedBy() {
        return reportedBy;
    }

    public void setReportedBy(int reportedBy) {
        this.reportedBy = reportedBy;
    }

    public Boolean getDeleted() {
        return isDeleted;
    }

    public void setDeleted(Boolean deleted) {
        isDeleted = deleted;
    }

    public String getReportMessage() {
        return reportMessage;
    }

    public void setReportMessage(String reportMessage) {
        this.reportMessage = reportMessage;
    }
}
