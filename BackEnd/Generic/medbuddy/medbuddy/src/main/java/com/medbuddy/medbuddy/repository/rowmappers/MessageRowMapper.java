/*
package com.medbuddy.medbuddy.rowmappers;

import com.medbuddy.medbuddy.models.Message;

import java.sql.ResultSet;
import java.sql.SQLException;

public class MessageRowMapper {
    public static Message mapRow(ResultSet rs) throws SQLException {
        Message message = new Message();
        message.setId(rs.getInt("id"));
        message.setMessage(rs.getString("message"));
        message.setDeleted(rs.getInt("isDeleted") == 1);
        message.setRead(rs.getInt("isRead") == 1);
        message.setFromMedBuddy(rs.getInt("isFromMedBuddy") == 1);
        message.setRepliesTo(rs.getInt("RepliesTo"));
        message.setSenderId(rs.getInt("SenderId"));
        message.setImagePath(rs.getString("imagePath"));
        message.setConversationId(rs.getInt("conversationId"));
        return message;
    }
}
*/
