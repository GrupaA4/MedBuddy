package com.medbuddy.medbuddy.exceptions;

public class NotFoundExceptions {
    public static class MedicalHistoryNotFound extends RuntimeException {
        public MedicalHistoryNotFound(String message) {
            super(message);
        }
    }

    public static class UserNotFound extends RuntimeException {
        public UserNotFound(String message) {
            super(message);
        }
    }
}
