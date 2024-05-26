package com.medbuddy.medbuddy.exceptions;

public abstract class NotFoundExceptions {
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

    public static class MedicNotFound extends RuntimeException {
        public MedicNotFound(String message) {
            super(message);
        }
    }
}
