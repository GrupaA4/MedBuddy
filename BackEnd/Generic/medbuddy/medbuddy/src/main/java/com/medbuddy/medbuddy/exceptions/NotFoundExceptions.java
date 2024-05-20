package com.medbuddy.medbuddy.exceptions;

public class NotFoundExceptions {
    public static class MedicalHistoryNotFoundException extends RuntimeException {
        public MedicalHistoryNotFoundException(String message) {
            super(message);
        }
    }

    public static class UserNotFoundException extends RuntimeException {
        public UserNotFoundException(String message) {
            super(message);
        }
    }
}
