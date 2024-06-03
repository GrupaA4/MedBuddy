package com.medbuddy.medbuddy.models;

import java.time.LocalDate;
import java.util.UUID;

public class Admin extends User {
    public Admin(UUID id, String email, String password, String lastName, String firstName, boolean gender, String pronoun1, String pronoun2, LocalDate dateOfBirth, String language, String country, String city, String phoneNumber, Integer profileImageNumber, String imageExtension, LocalDate lastTimeLoggedIn, boolean isAdmin, boolean isDeleted) {
        super(id, email, password, lastName, firstName, gender, pronoun1, pronoun2, dateOfBirth, language, country, city, phoneNumber, profileImageNumber, imageExtension, lastTimeLoggedIn, isAdmin, isDeleted);
    }
}
