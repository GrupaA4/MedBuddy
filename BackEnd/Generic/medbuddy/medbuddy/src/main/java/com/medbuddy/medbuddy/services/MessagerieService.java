package com.medbuddy.medbuddy.services;

import com.medbuddy.medbuddy.models.Conversation;
import com.medbuddy.medbuddy.models.Message;
import com.medbuddy.medbuddy.repository.daos.MessagerieDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;
import java.util.UUID;

@Service
public class MessagerieService {
    @Autowired
    private final MessagerieDAO messagerieDAO;
    public MessagerieService(MessagerieDAO messagerieDAO) {
        this.messagerieDAO = messagerieDAO;
    }
    public void createConversationBetween(UUID id, UUID loggedUserId, UUID conversedWithUserId) {
        try{
            messagerieDAO.createConversationBetween(id, loggedUserId, conversedWithUserId);
        }
        catch (SQLException e){
            System.err.println(e.getMessage());
        }
    }
    public void addMessageToConversation(UUID id, UUID senderId, UUID conversationId, String message, String imagePath, UUID repliesTo, int isFromMedBuddy) {
        try{
            messagerieDAO.addMessageToConversation(id, senderId, conversationId, message, imagePath, repliesTo, isFromMedBuddy);
        }
        catch (SQLException e){
            System.err.println(e.getMessage());
        }
    }
    public void deleteMessageFromDatabase(UUID messageId) {
        try{
            messagerieDAO.deleteMessageFromDatabase(messageId);
        }
        catch (SQLException e){
            System.err.println(e.getMessage());
        }
    }
    public void softDeleteMessage(UUID messageId) {
        try {
            messagerieDAO.softDeleteMessage(messageId);
        }
        catch (SQLException e){
            System.err.println(e.getMessage());
        }
    }
    public List<Conversation> getUsersConversations(UUID userId) {
        try {
            return messagerieDAO.getUsersConversations(userId);
        }
        catch (SQLException e){
            System.err.println(e.getMessage());
            return null;
        }
    }
    public Message getMessageInfo(UUID messageId) {
        try {
            return messagerieDAO.getMessageInfo(messageId).get(0);
        }
        catch (SQLException e){
           System.err.println(e.getMessage());
           return null;
        }
    }
    public List<Message> getPastXMessages(UUID conversationId, int x) {
        try {
            return messagerieDAO.getPastXMessages(conversationId, x);
        }
        catch (SQLException e){
            System.err.println(e.getMessage());
            return null;
        }
    }
}
