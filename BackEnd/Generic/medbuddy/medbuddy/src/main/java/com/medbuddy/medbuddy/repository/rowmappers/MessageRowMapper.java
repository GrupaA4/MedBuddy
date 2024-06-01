package com.medbuddy.medbuddy.repository.rowmappers;

import com.medbuddy.medbuddy.models.Message;
import com.medbuddy.medbuddy.utilitaries.DataConvertorUtil;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;

public class MessageRowMapper implements RowMapper<Message> {
    @Override
    public Message mapRow(ResultSet rs, int rowNum) throws SQLException {
        Message message = new Message();
//        message.setId(UUID.fromString(rs.getString("id")));
        message.setMessage(rs.getString("message"));
        /*message.setDeleted(DataConvertorUtil.turn0or1intoBoolean(rs.getInt("isDeleted")));
        message.setRead(rs.getInt("isRead") == 1);
        message.setFromMedBuddy(rs.getInt("isFromMedBuddy") == 1);
        message.setRepliesTo(UUID.fromString(rs.getString("RepliesTo")));
        message.setSenderId(UUID.fromString(rs.getString("SenderId")));
        message.setTimeSent(rs.getDate("timeSent").toLocalDate());
        message.setImageNumber(rs.getInt("imageNumber"));
        message.setImageExtension(rs.getString("imageExtension"));
        message.setConversationId(UUID.fromString(rs.getString("conversationId")));*/
        return message;
    }
}

