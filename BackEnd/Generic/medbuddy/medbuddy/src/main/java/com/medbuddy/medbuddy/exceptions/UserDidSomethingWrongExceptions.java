package com.medbuddy.medbuddy.exceptions;

public abstract class UserDidSomethingWrongExceptions {
    public static class UserWithEmailAlreadyExists extends RuntimeException {
        public UserWithEmailAlreadyExists(String message) {
            super(message);
        }
    }

    public static class TriedToGetAllUsers extends RuntimeException {
        public TriedToGetAllUsers(String message) {
            super(message);
        }
    }

    public static class TooManyParts extends RuntimeException {
        public TooManyParts(String message) {
            super(message);
        }
    }

    public static class ConversationAlreadyExists extends RuntimeException {
        public ConversationAlreadyExists(String message) {
            super(message);
        }
    }

    public static class UserCredentialsNotFound extends RuntimeException {
        public UserCredentialsNotFound(String message) {
            super(message);
        }
    }
}
