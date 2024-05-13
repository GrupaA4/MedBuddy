package com.medbuddy.medbuddy.repository.daos;

import com.medbuddy.medbuddy.models.Conversation;
//import com.medbuddy.medbuddy.repository.rowmappers.ConversationRowMapper;
import com.medbuddy.medbuddy.models.Message;
import com.medbuddy.medbuddy.repository.rowmappers.ConversationRowMapper;
import com.medbuddy.medbuddy.repository.rowmappers.MessageRowMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Repository
public class MessagerieDAO {
    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    private JdbcTemplate jdbcTemplate;
    //public MessagerieDAO(JdbcTemplate jdbcTemplate) {this.jdbcTemplate = jdbcTemplate;}
    public void createConversationBetween(String loggedUserId, String conversedWithUserId) throws SQLException {
        Random random = new Random();
        int nId = random.nextInt(10000);
        String id = String.valueOf(nId);
        int nullValue = 0;
        jdbcTemplate.update("insert into conversation (id, userId1, userId2, lastMessageId, lastSentAt, isDeleted) values(?, ?, ?, NULL, NULL, ?)", id, loggedUserId, conversedWithUserId, nullValue);
    }

    public void addMessageToConversation(String senderId, String conversationId, String message, String imagePath, Integer repliesTo, int isFromMedBuddy) throws SQLException {
        Random random = new Random();
        int nIid = random.nextInt(10000);
        String id = String.valueOf(nIid);
        int nullValue = 0;
        jdbcTemplate.update("insert into message (id, senderId, conversationId, message, timesent, isRead, imagePath, repliesTo, isFromMedBuddy, isDeleted) values (?, ?, ?, ?, SYSDATE, ?, ?, ?, ?, ?)",
                id, senderId, conversationId, message, nullValue, imagePath, repliesTo, isFromMedBuddy, nullValue);
    }
    public void deleteMessageFromDatabase(String messageId) throws SQLException {
        jdbcTemplate.update("delete from message where id = ?", messageId);
    }
    public void softDeleteMessage(String messageId) throws SQLException {
        jdbcTemplate.update("update message set isDeleted = 1 where id = ?", messageId);
    }
    public List<Conversation> getUsersConversations(String userId) throws SQLException {
        return jdbcTemplate.query("select * from conversation where userId1 = ? or userId2 = ?", new Object[]{userId, userId}, new ConversationRowMapper());
    }
    public List<Message> getMessageInfo(String messageId) throws SQLException {
        return  jdbcTemplate.query("select * from message where messageId = ?", new Object[]{messageId}, new MessageRowMapper());
    }
}

