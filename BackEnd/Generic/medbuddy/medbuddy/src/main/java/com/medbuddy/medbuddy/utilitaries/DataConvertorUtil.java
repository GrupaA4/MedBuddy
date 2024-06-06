package com.medbuddy.medbuddy.utilitaries;

import com.medbuddy.medbuddy.exceptions.DatabaseExceptions;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public abstract class DataConvertorUtil {
    public static boolean turn0or1intoBoolean(int bool) throws DatabaseExceptions.BooleanProblemInDatabase {
        if (bool == 1) return true;
        else if (bool == 0) return false;
        else throw new DatabaseExceptions.BooleanProblemInDatabase("A database boolean isn't a 0 or a 1");
    }

    public static int turnBooleanInto0or1(boolean bool) {
        if (bool) return 1;
        else return 0;
    }

    public static LocalDate turnDotDateToLocalDate(String date) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.uuuu");
        return LocalDate.parse(date, formatter);
    }

    public static String turnLocalDateToDotDate(LocalDate date) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.uuuu");
        return date.format(formatter);
    }

    public static LocalDate turnSlashDateToLocalDate(String date) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/uuuu");
        return LocalDate.parse(date, formatter);
    }

    public static String turnLocalDateToSlashDate(LocalDate date) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/uuuu");
        return date.format(formatter);
    }

    public static LocalDate turnDDMMYYYYToLocalDate(String date) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.uuuu");
        return LocalDate.parse(date, formatter);
    }

    public static String turnLocalDateToDDMMYYYY(LocalDate date) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.uuuu");
        return date.format(formatter);
    }
}
