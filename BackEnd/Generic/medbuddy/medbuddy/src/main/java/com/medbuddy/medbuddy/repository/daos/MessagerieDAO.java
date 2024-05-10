/*
package com.medbuddy.medbuddy.daos;

import com.medbuddy.medbuddy.database.Database;
import com.medbuddy.medbuddy.models.Conversation;
import com.medbuddy.medbuddy.rowmappers.ConversationRowMapper;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
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
            e.printStackTrace();
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
        //UPDATE: As the date is always the SYSDATE we can get away with it here
        //Is still an issue for data manipulation
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
    public void deleteMessageFromDatabase(int messageId) throws SQLException {
        Connection con = Database.getConnection();
        try (PreparedStatement pstmt = con.prepareStatement(
                "delete from message where id = ?"
        )){
            pstmt.setInt(1, messageId);;
            pstmt.executeUpdate();
        }
        catch (SQLException e) {
             e.printStackTrace();
        }
    }
    public void softDeleteMessage(int messageId) throws SQLException {
        Connection con = Database.getConnection();
        try (PreparedStatement pstmt = con.prepareStatement(
                "update message set isDeleted = 1 where id = ?"
        )){
            pstmt.setInt(1, messageId);;
            pstmt.executeUpdate();
        }
        catch (SQLException e) {
            e.printStackTrace();
        }
    }
    public List<Conversation> getUsersConversations(int userId) throws SQLException {
        Connection con = Database.getConnection();
        try (PreparedStatement pstmt = con.prepareStatement(
                "select * from conversation where userId1 = ? or userId2 = ?"
        )){
            pstmt.setInt(1, userId);
            pstmt.setInt(2, userId);
            ResultSet rs = pstmt.executeQuery();
            List<Conversation> conversationList = new ArrayList<>();
            while(rs.next()) conversationList.add(ConversationRowMapper.mapRow(rs));
            return conversationList;
        }
        catch (SQLException e){
            e.printStackTrace();
            return null;
        }
    }
}
*/
