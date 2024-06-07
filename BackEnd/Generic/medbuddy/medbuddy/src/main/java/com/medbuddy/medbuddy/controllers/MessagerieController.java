package com.medbuddy.medbuddy.controllers;

import com.medbuddy.medbuddy.controllers.requestbodies.MessageRequestBodies;
import com.medbuddy.medbuddy.controllers.responsebodies.MessageResponseBody;
import com.medbuddy.medbuddy.models.Conversation;
import com.medbuddy.medbuddy.models.Message;
import com.medbuddy.medbuddy.repository.daos.UserDAO;
import com.medbuddy.medbuddy.services.MessagerieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/medbuddy/chat")
public class MessagerieController {
    @Autowired
    private MessagerieService messagerieService;

    @GetMapping("/closeconversation")
    public void closeConversation() {
        messagerieService.closeConversation();
    }

    @GetMapping("/receive/{flag}")
    public Message receiveMessageFromMedbuddy(@PathVariable int flag) {
        return messagerieService.receiveMessage(flag);
    }

    @PostMapping("/send")
    public void sendMessageToMedbuddy(@RequestBody Message message) {
        messagerieService.sendMessageToMedbuddy(message.getMessage());
    }

    /*
    //works
    @PutMapping("/createconversation/{id}")
    public void createConversationBetween(@PathVariable UUID id) {
        messagerieService.createConversationBetween(id);
    }

    @PostMapping("/sendmessage/{id}")
    public void addMessageToConversation(@PathVariable UUID id, @RequestBody MessageRequestBodies.MessageBody message) {
        messagerieService.addMessageToConversation(new Message(message), id);
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
    */
}
