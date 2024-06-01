package com.medbuddy.medbuddy.exceptions;

public abstract class DatabaseExceptions {
    public static class BooleanProblemInDatabase extends RuntimeException {
        public BooleanProblemInDatabase(String message) {
            super(message);
        }
    }

    public static class NonUniqueIdentifier extends RuntimeException {
        public NonUniqueIdentifier(String message) {
            super(message);
        }
    }

    public static class ErrorInExecutingStatement extends RuntimeException {
        public ErrorInExecutingStatement(String message) {
            super(message);
        }
    }
}