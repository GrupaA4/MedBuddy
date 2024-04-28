package com.medbuddy.medbuddy.daos;

import com.medbuddy.medbuddy.database.Database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Random;

public class MessagerieDAO {
    public void createConversationBetween(int loggedUserId, int conversedWithUserId) throws SQLException {
        Connection con = Database.getConnection();
        // This is just for now as I don't want to bungle up work to req a sequence creation
        // Will replace with a sequence at some point
        Random random = new Random();
        int id = random.nextInt(10000);
        try (PreparedStatement pstmt = con.prepareStatement(
                "insert into conversation (id, userId1, userId2, lastMessageId, isDeleted) values (?, ?, ?, NULL, ?)")) {
            int nullValue = 0;
            pstmt.setInt(1, id);
            pstmt.setInt(2, loggedUserId);
            pstmt.setInt(3, conversedWithUserId);
            pstmt.setInt(4, nullValue);
            pstmt.executeUpdate();
        }
        catch (SQLException e) {
            System.out.println(2);
        }
    }
    //The doc said only convo id provided, but I reckon all these should be added
    //Subject to discussion ig
    public void addMessageToConversation(int senderId, int conversationId, String message, String imagePath, Integer repliesTo, int isFromMedBuddy) throws SQLException {
        Connection con = Database.getConnection();
        // This is just for now as I don't want to bungle up work to req a sequence creation
        // Will replace with a sequence at some point
        Random random = new Random();
        int id = random.nextInt(10000);
        //Didn't add the date as it isn't in the provided model and am unsure as to how the integration would be
        //Subject to change
        try (PreparedStatement pstmt = con.prepareStatement(
                "insert into message (id, senderId, conversationId, message, timesent, isRead, imagePath, repliesTo, isFromMedBuddy, isDeleted) values (?, ?, ?, ?, SYSDATE, ?, ?, ?, ?, ?)"
        )){
            int nullValue = 0;
            pstmt.setInt(1, id);
            pstmt.setInt(2, senderId);
            pstmt.setInt(3, conversationId);
            pstmt.setString(4, message);
            pstmt.setInt(5, nullValue);
            pstmt.setString(6, imagePath);
            if(repliesTo != null) pstmt.setInt(7, repliesTo);
            else pstmt.setNull(7, java.sql.Types.INTEGER);
            pstmt.setInt(8, isFromMedBuddy);
            pstmt.setInt(9, nullValue);
            pstmt.executeUpdate();
        }
    }
}
