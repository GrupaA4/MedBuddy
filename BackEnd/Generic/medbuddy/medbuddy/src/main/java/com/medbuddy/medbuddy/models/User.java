package com.medbuddy.medbuddy.models;

import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class User {
    private UUID id;
    private String email;
    private String password;
    private String lastName;
    private String firstName;
    private Boolean gender;
    private String pronoun1;
    private String pronoun2;
    private Date dateOfBirth;
    private String language;
    private String country;
    private String city;
    private int postalNumber;
    private int phoneNumber;
    private String profileImagePath;
    private Boolean isAdmin;
    private Boolean isDeleted;

    public User(UUID id, String email, String password, String lastName, String firstName, Boolean gender, String pronoun1, String pronoun2, Date dateOfBirth, String language, String country, String city, int postalNumber, int phoneNumber, String profileImagePath, Boolean isAdmin, Boolean isDeleted) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.lastName = lastName;
        this.firstName = firstName;
        this.gender = gender;
        this.pronoun1 = pronoun1;
        this.pronoun2 = pronoun2;
        this.dateOfBirth = dateOfBirth;
        this.language = language;
        this.country = country;
        this.city = city;
        this.postalNumber = postalNumber;
        this.phoneNumber = phoneNumber;
        this.profileImagePath = profileImagePath;
        this.isAdmin = isAdmin;
        this.isDeleted = isDeleted;
    }

    public User() {
    }
}
