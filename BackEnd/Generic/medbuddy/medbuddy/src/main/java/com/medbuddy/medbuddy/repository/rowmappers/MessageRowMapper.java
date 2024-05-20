package com.medbuddy.medbuddy.repository.rowmappers;

import com.medbuddy.medbuddy.models.Message;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;

public class MessageRowMapper implements RowMapper<Message> {
    @Override
    public Message mapRow(ResultSet rs, int rowNum) throws SQLException {
        Message message = new Message();
        message.setId(UUID.fromString(rs.getString("id")));
        message.setMessage(rs.getString("message"));
        message.setIsDeleted(rs.getInt("isDeleted") == 1);
        message.setIsRead(rs.getInt("isRead") == 1);
        message.setIsFromMedBuddy(rs.getInt("isFromMedBuddy") == 1);
        message.setRepliesTo(UUID.fromString(rs.getString("RepliesTo")));
        message.setSenderId(UUID.fromString(rs.getString("SenderId")));
        message.setTimeSent(rs.getDate("timeSent"));
        message.setImagePath(rs.getString("imagePath"));
        message.setConversationId(UUID.fromString(rs.getString("conversationId")));
        return message;
    }
}

