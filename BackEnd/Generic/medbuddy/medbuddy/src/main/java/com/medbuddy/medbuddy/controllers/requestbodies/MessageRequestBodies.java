package com.medbuddy.medbuddy.controllers.requestbodies;

import lombok.Data;

import java.util.Date;
import java.util.UUID;

public abstract class MessageRequestBodies {
    @Data
    public static class MessageBody {
        private String message;
        //private MultiPartFile image;
        private String image;
        private String imageExtension;
        private UUID repliesTo;
        private boolean isFromMedbuddy;
    }
}
