package com.medbuddy.medbuddy.utilitaries;

import com.medbuddy.medbuddy.exceptions.DatabaseExceptions;

public class DataConvertorUtil {
    public static boolean turn0or1intoBoolean(int bool) throws DatabaseExceptions.BooleanProblemInDatabase {
        if (bool == 1) return true;
        else if (bool == 0) return false;
        else throw new DatabaseExceptions.BooleanProblemInDatabase("A database boolean isn't a 0 or a 1");
    }

    public static int turnBooleanInto0or1(boolean bool) {
        if (bool) return 1;
        else return 0;
    }
}
