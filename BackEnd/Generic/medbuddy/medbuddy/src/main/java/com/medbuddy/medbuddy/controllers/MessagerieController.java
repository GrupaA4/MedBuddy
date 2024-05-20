package com.medbuddy.medbuddy.controllers;

import com.medbuddy.medbuddy.models.Conversation;
import com.medbuddy.medbuddy.models.Message;
import com.medbuddy.medbuddy.repository.daos.MessagerieDAO;
import com.medbuddy.medbuddy.services.MessagerieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/medbuddy")
public class MessagerieController {
    @Autowired
    private MessagerieService messagerieService;

    @PostMapping("/createconversation/{id}")
    public void createConversationBetween(@PathVariable UUID id) {
        messagerieService.createConversationBetween(UUID.randomUUID(), UUID.randomUUID(), id);
    }

    @PostMapping("/sendmessage/{id}")
    public void addMessageToConversation(@PathVariable UUID id, @RequestBody Message message) {
        int isFromMedBuddy;
        if(message.getIsFromMedBuddy()) isFromMedBuddy = 1;
        else isFromMedBuddy = 0;
        messagerieService.addMessageToConversation(UUID.randomUUID(), UUID.randomUUID(), id, message.getMessage(), message.getImagePath(), message.getRepliesTo(), isFromMedBuddy);
    }

    @GetMapping("/conversation/{conversationId}/{messageToStartFrom}/{messageToEndLoad}")
    public List<Message> getPastXMessages(@PathVariable UUID conversationId, @PathVariable int messageToEndLoad) {
        return messagerieService.getPastXMessages(conversationId, messageToEndLoad);
    }

    @GetMapping("/userconversations/{userId}")
    public List<Conversation> getUsersConversations(@PathVariable UUID userId) {
        return messagerieService.getUsersConversations(userId);
    }

    @GetMapping("/message/{messageId}")
    public Message getMessage(@PathVariable UUID messageId) {
        return  messagerieService.getMessageInfo(messageId);
    }

    @PatchMapping("/softdeletemessage/{messageId}")
    public void softDeleteMessage(@PathVariable UUID messageId) {
        messagerieService.softDeleteMessage(messageId);
    }

    @DeleteMapping("/harddeletemessage/{messageId}")
    public void hardDeleteMessage(@PathVariable UUID messageId) {
        messagerieService.deleteMessageFromDatabase(messageId);
    }
}
