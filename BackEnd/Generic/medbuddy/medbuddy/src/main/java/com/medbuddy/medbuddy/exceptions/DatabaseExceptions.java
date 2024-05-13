package com.medbuddy.medbuddy.exceptions;

public class DatabaseExceptions {
    public static class BooleanProblemInDatabase extends Exception {
        public BooleanProblemInDatabase(String message) {
            super(message);
        }
    }

    public static class StringProblemInDatabase extends Exception {
        public StringProblemInDatabase(String message) {
            super(message);
        }
    }
}