package com.medbuddy.medbuddy.exceptions;

public class UserDidSomethingWrongExceptions {
    public static class UserWithEmailAlreadyExists extends RuntimeException {
        public UserWithEmailAlreadyExists(String message) {
            super(message);
        }
    }
}
