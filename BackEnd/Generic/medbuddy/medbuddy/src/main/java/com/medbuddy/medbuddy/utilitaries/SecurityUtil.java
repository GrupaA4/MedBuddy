package com.medbuddy.medbuddy.utilitaries;

import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import java.util.UUID;

public class SecurityUtil {
    public static UUID getNewId() {
        return UUID.randomUUID();
    }
}
