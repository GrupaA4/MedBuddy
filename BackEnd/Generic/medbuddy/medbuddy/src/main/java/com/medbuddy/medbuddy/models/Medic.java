package com.medbuddy.medbuddy.models;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;

@EqualsAndHashCode(callSuper = true)
@Data
public class Medic extends User{
    private String typeOfMedic;
    private String clinic;
    private String certificateImagePath;
    private Boolean isApproved;

    public Medic(int id, String email, String password, String lastName, String firstName, Boolean gender, String pronoun1, String pronoun2, Date dateOfBirth, String language, String country, String city, int postalNumber, int phoneNumber, String profileImagePath, Boolean isAdmin, Boolean isDeleted, String typeOfMedic, String clinic, String certificateImagePath, Boolean isApproved) {
        super(id, email, password, lastName, firstName, gender, pronoun1, pronoun2, dateOfBirth, language, country, city, postalNumber, phoneNumber, profileImagePath, isAdmin, isDeleted);
        this.typeOfMedic = typeOfMedic;
        this.clinic = clinic;
        this.certificateImagePath = certificateImagePath;
        this.isApproved = isApproved;
    }
}
