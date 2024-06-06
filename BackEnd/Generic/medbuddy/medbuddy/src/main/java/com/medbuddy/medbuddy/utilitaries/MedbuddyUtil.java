package com.medbuddy.medbuddy.utilitaries;

import com.medbuddy.medbuddy.models.Message;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class MedbuddyUtil {

    public void closeConversation(UUID userId) {
        //to be added
    }

    public Message receiveMessageFromMedbuddy(UUID userId) {
        return new Message("Test message rebeca.cruickshank@hotmail.com");
        //receive message
        //check for diagnosis
        //  if diagnosis, then create a MedicalHistoryEntry
    }

    public void sendMessageToMedbuddy(UUID userId) {
        //send message
    }
}
