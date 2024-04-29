package com.medbuddy.medbuddy.rowmappers;

import com.medbuddy.medbuddy.models.Conversation;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ConversationRowMapper {
    public static Conversation mapRow(ResultSet rs) throws SQLException {
        Conversation conversation  = new Conversation();
        conversation.setId(rs.getInt("id"));
        conversation.setUserId1(rs.getInt("userId1"));
        conversation.setUserId2(rs.getInt("userId2"));
        conversation.setLastMessageId(rs.getInt("lastMessageId"));
        if(rs.getInt("isDeleted") == 1){
            conversation.setDeleted(true);
        }
        else {
            conversation.setDeleted(false);
        }
        return conversation;
    }
}
