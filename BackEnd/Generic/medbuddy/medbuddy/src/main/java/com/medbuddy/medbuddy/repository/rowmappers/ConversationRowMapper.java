
package com.medbuddy.medbuddy.repository.rowmappers;

import com.medbuddy.medbuddy.models.Conversation;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;

public class ConversationRowMapper implements RowMapper<Conversation> {
    @Override
    public Conversation mapRow(ResultSet rs, int rowNum) throws SQLException {
        Conversation conversation  = new Conversation();
        conversation.setId(UUID.fromString(rs.getString("id")));
        conversation.setUserId1(UUID.fromString(rs.getString("userId1")));
        conversation.setUserId2(UUID.fromString(rs.getString("userId2")));
        conversation.setLastMessageId(UUID.fromString(rs.getString("lastMessageId")));
        conversation.setIsDeleted(rs.getInt("isDeleted") == 1);
        return conversation;
    }
}

