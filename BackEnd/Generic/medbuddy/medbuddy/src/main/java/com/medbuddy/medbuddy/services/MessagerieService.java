package com.medbuddy.medbuddy.services;

import com.medbuddy.medbuddy.controllers.responsebodies.MessageResponseBody;
import com.medbuddy.medbuddy.exceptions.NotFoundExceptions;
import com.medbuddy.medbuddy.exceptions.UserDidSomethingWrongExceptions;
import com.medbuddy.medbuddy.models.Conversation;
import com.medbuddy.medbuddy.models.Entity;
import com.medbuddy.medbuddy.models.Message;
import com.medbuddy.medbuddy.models.User;
import com.medbuddy.medbuddy.repository.daos.MessagerieDAO;
import com.medbuddy.medbuddy.repository.daos.UserDAO;
import com.medbuddy.medbuddy.utilitaries.DataConvertorUtil;
import com.medbuddy.medbuddy.utilitaries.MedbuddyUtil;
import com.medbuddy.medbuddy.utilitaries.SecurityUtil;
import com.medbuddy.medbuddy.utilitaries.validators.EntityValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Service
public class MessagerieService {

    @Autowired
    MedbuddyUtil medbuddyUtil;
    @Autowired
    UserDAO userDAO;

    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
    public void closeConversation() {
        UUID userId = userDAO.getUserId(SecurityUtil.getEmail());
        medbuddyUtil.closeConversation(userId);
    }

    public void startConversationTimer() {
        scheduler.schedule(this::closeConversation, 15, TimeUnit.MINUTES);
    }

    public Message receiveMessage(int flag) {
        UUID userId = userDAO.getUserId(SecurityUtil.getEmail());
        startConversationTimer();
        if(DataConvertorUtil.turn0or1intoBoolean(flag)) {
            return new Message("Hello, " +
                    userDAO.getUserById(userId).getLastName() + " " +
                    userDAO.getUserById(userId).getFirstName() +
                    "! I am Medbuddy, your personal assistant. Please tell me in great detail what you feel wrong at the moment.");
        }

        return medbuddyUtil.receiveMessageFromMedbuddy(userId);
    }

    public void sendMessageToMedbuddy(String message) {
        UUID userId = userDAO.getUserId(SecurityUtil.getEmail());
        medbuddyUtil.sendMessageToMedbuddy(message, userId);
    }

    /*@Autowired
    private MessagerieDAO messagerieDAO;
    @Autowired
    private UserDAO userDAO;

    public void createConversationBetween(UUID conversedWithUserId) {
        UUID loggedInUserId = userDAO.getUserId(SecurityUtil.getEmail());
        User user1 = userDAO.getUserById(loggedInUserId);
        User user2 = userDAO.getUserById(conversedWithUserId);

        if(!EntityValidator.validate(user1)) {
            throw new NotFoundExceptions.UserNotFound("No user with id " + loggedInUserId + " was found");
        }
        if(!EntityValidator.validate(user2)) {
            throw new NotFoundExceptions.UserNotFound("No user with id " + conversedWithUserId + "was found");
        }

        if(!messagerieDAO.checkIfConversationAlreadyExists(loggedInUserId, conversedWithUserId)) {
            messagerieDAO.createConversationBetween(SecurityUtil.getNewId(), loggedInUserId, conversedWithUserId);
        } else {
            throw new UserDidSomethingWrongExceptions.ConversationAlreadyExists("A conversation between these two users already exists");
        }
    }

    public void addMessageToConversation(Message message, UUID conversationId) {
        message.setId(SecurityUtil.getNewId());

        message.setConversationId(conversationId);

        UUID senderId = userDAO.getUserId(SecurityUtil.getEmail());
        message.setSenderId(senderId);

        Conversation conversation = messagerieDAO.getConversationById(conversationId.toString());


        message.setTimeSent(LocalDate.now());

        message.setDeleted(false);
        messagerieDAO.addMessageToConversation(message);
    }

    public void deleteMessageFromDatabase(UUID messageId) {
        messagerieDAO.deleteMessageFromDatabase(messageId);
    }

    public void softDeleteMessage(UUID messageId) {
        messagerieDAO.softDeleteMessage(messageId);
    }

    public List<Conversation> getUsersConversations(UUID userId) {
        return messagerieDAO.getUsersConversations(userId);
    }

    public Message getMessageInfo(UUID messageId) {
        return messagerieDAO.getMessageInfo(messageId).get(0);
    }

    public List<Message> getPastXMessages(UUID conversationId, int x) {
        return messagerieDAO.getPastXMessages(conversationId, x);
    }*/
}
