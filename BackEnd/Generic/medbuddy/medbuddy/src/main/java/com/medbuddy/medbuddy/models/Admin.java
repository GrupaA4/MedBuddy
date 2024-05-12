package com.medbuddy.medbuddy.models;

import java.util.Date;
import java.util.UUID;

public class Admin extends User{
    public Admin(UUID id, String email, String password, String lastName, String firstName, Boolean gender, String pronoun1, String pronoun2, Date dateOfBirth, String language, String country, String city, int postalNumber, int phoneNumber, String profileImagePath, Boolean isAdmin, Boolean isDeleted) {
        super(id, email, password, lastName, firstName, gender, pronoun1, pronoun2, dateOfBirth, language, country, city, postalNumber, phoneNumber, profileImagePath, isAdmin, isDeleted);
    }
}
