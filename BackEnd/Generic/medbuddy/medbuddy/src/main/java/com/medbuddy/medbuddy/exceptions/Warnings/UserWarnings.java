package com.medbuddy.medbuddy.exceptions.Warnings;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.util.UUID;

public class UserWarnings {
    public static class MultipleUsersSameEmail {
        public static void log(String id1, String id2, String email) {
            Logger logger = LogManager.getLogger("Warnings");
            logger.debug("Multiple users with email {}were found ({}, {})", email, id1, id2);
        }
    }

    public static class MultipleUsersSameCredentials {
        public static void log(String email, String password) {
            Logger logger = LogManager.getLogger("Warnings");
            logger.debug("Multiple users with email {} and password {} were found", email, password);
        }
    }

    public static class MultipleMedicsSameUserId {
        public static void log(UUID medicId1, UUID medicId2, UUID id) {
            Logger logger = LogManager.getLogger("Warnings");
            logger.debug("Multiple medics with the same user id ({}) were found", id);
        }
    }
}
