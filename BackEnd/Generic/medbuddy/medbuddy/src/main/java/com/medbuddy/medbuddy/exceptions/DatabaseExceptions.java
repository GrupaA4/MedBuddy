package com.medbuddy.medbuddy.exceptions;

public class DatabaseExceptions {
    public static class BooleanProblemInDatabase extends RuntimeException {
        public BooleanProblemInDatabase(String message) {
            super(message);
        }
    }

    public static class StringProblemInDatabase extends RuntimeException {
        public StringProblemInDatabase(String message) {
            super(message);
        }
    }
}