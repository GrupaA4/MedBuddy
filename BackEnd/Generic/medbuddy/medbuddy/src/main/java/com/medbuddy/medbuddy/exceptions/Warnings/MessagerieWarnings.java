package com.medbuddy.medbuddy.exceptions.Warnings;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.util.UUID;

public abstract class MessagerieWarnings {
    public static class MultipleConversationsSameUsers {
        public static void log(UUID convId1, UUID convId2) {
            Logger logger = LogManager.getLogger("Warnings");
            logger.debug("Multiple conversations with the same users were found ({}, {})", convId1, convId2);
        }
    }
}
