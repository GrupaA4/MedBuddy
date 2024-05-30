package com.medbuddy.medbuddy.repository.daos;

import com.medbuddy.medbuddy.exceptions.DatabaseExceptions;
import com.medbuddy.medbuddy.exceptions.Warnings.MessagerieWarnings;
import com.medbuddy.medbuddy.models.Conversation;
//import com.medbuddy.medbuddy.repository.rowmappers.ConversationRowMapper;
import com.medbuddy.medbuddy.models.Message;
import com.medbuddy.medbuddy.repository.rowmappers.ConversationRowMapper;
import com.medbuddy.medbuddy.repository.rowmappers.MessageRowMapper;
import com.medbuddy.medbuddy.utilitaries.DataConvertorUtil;
import com.medbuddy.medbuddy.utilitaries.validators.EntityValidator;
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
import java.util.UUID;

@Repository
public class MessagerieDAO {
    /*
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void createConversationBetween(UUID id, UUID loggedUserId, UUID conversedWithUserId) {
        jdbcTemplate.update("insert into conversation (" +
                "id, " +
                "userId1, " +
                "userId2, " +
                "lastMessageId, " +
                "lastSentAt, " +
                "isDeleted" +
                ") values(?, ?, ?, NULL, NULL, ?)",
                id.toString(),
                loggedUserId.toString(),
                conversedWithUserId.toString(),
                0);
    }

    public boolean checkIfConversationAlreadyExists(UUID id1, UUID id2) {
        List<String> conversations = jdbcTemplate.queryForList(
                "select * from conversation where (userid1 = ? and userid2 = ?) or (userid1 = ? and userid2 = ?)",
                String.class, id1.toString(), id2.toString(), id2.toString(), id1.toString());

        for(var conversationIdString : conversations) {
            Conversation conversation = getConversationById(conversationIdString);
            if(!EntityValidator.validate(conversation)) {
                conversations.remove(conversationIdString);
            }
        }

        return switch (conversations.size()) {
            case 0 -> false;
            case 1 -> true;
            default -> {
                MessagerieWarnings.MultipleConversationsSameUsers.log(UUID.fromString(conversations.get(0)), UUID.fromString(conversations.get(1)));
                yield true;
            }
        };
    }

    public Conversation getConversationById(String id) {
        return jdbcTemplate.queryForObject("select * from conversation where id = ?", new ConversationRowMapper(), id);
    }

    public void addMessageToConversation(Message message) {
        jdbcTemplate.update("insert into message (" +
                        "id, " +
                        "senderId, " +
                        "conversationId, " +
                        "message, " +
                        "timeSent, " +
                        "isRead, " +
                        "imageNumber, " +
                        "imageExtension, " +
                        "repliesTo, " +
                        "isFromMedBuddy, " +
                        "isDeleted) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                message.getId().toString(),
                message.getSenderId().toString(),
                message.getConversationId().toString(),
                message.getMessage(),
                DataConvertorUtil.turnLocalDateToDDMMYYYY(message.getTimeSent()),
                DataConvertorUtil.turnBooleanInto0or1(message.isRead()),
                message.getImageNumber(),
                message.getRepliesTo().toString(),
                DataConvertorUtil.turnBooleanInto0or1(message.isFromMedBuddy()),
                DataConvertorUtil.turnBooleanInto0or1(message.isDeleted()));
    }

    public void deleteMessageFromDatabase(UUID messageId) {
        jdbcTemplate.update("delete from message where id = ?", messageId);
    }

    public void softDeleteMessage(UUID messageId) {
        jdbcTemplate.update("update message set isDeleted = 1 where id = ?", messageId);
    }

    public List<Conversation> getUsersConversations(UUID userId) {
        return jdbcTemplate.query("select * from conversation where userId1 = ? or userId2 = ?", new Object[]{userId, userId}, new ConversationRowMapper());
    }

    public List<Message> getMessageInfo(UUID messageId) {
        return  jdbcTemplate.query("select * from message where messageId = ?", new Object[]{messageId}, new MessageRowMapper());
    }

    public List<Message> getPastXMessages(UUID conversationId, int x) {
        return jdbcTemplate.query("select * from (select * from message where conversationId = ? ORDER BY timesent DESC) where rownum <= ?", new Object[]{conversationId, x}, new MessageRowMapper());
    }
    */
}

