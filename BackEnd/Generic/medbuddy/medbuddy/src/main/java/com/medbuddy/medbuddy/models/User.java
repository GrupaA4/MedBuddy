package com.medbuddy.medbuddy.models;

import com.medbuddy.medbuddy.controllers.requestbodies.UserRequestBodies;
import com.medbuddy.medbuddy.utilitaries.DataConvertorUtil;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class User implements Entity{
    protected UUID id;
    protected String email;
    protected String password;
    protected String lastName;
    protected String firstName;
    protected boolean gender;
    protected String pronoun1;
    protected String pronoun2;
    protected LocalDate dateOfBirth;
    protected String language;
    protected String country;
    protected String city;
    protected String phoneNumber;
    protected Integer profileImageNumber;
    protected String imageExtension;
    protected LocalDate lastTimeLoggedIn;
    protected boolean isAdmin;
    private boolean isDeleted;

    public User(User user) {
        id = user.id;
        email = user.email;
        password = user.password;
        lastName = user.lastName;
        firstName = user.firstName;
        gender = user.gender;
        pronoun1 = user.pronoun1;
        pronoun2 = user.pronoun2;
        dateOfBirth = user.dateOfBirth;
        language = user.language;
        country = user.country;
        city = user.city;
        phoneNumber = user.phoneNumber;
        profileImageNumber = user.profileImageNumber;
        imageExtension = user.imageExtension;
        lastTimeLoggedIn = user.lastTimeLoggedIn;
        isAdmin = user.isAdmin;
        isDeleted = user.isDeleted;
    }
    
    public User(UserRequestBodies.UserSignup userRequest) {
        email = userRequest.getEmail();
        password = userRequest.getPassword();
        lastName = userRequest.getLastName();
        firstName = userRequest.getFirstName();
        gender = userRequest.isGender();
        pronoun1 = userRequest.getPronoun1();
        pronoun2 = userRequest.getPronoun2();
        dateOfBirth = DataConvertorUtil.turnDDMMYYYYToLocalDate(userRequest.getDateOfBirth());
        language = userRequest.getLanguage();
        country = userRequest.getCountry();
        city = userRequest.getCity();
        phoneNumber = userRequest.getPhoneNumber();
        imageExtension = userRequest.getImageExtension();
    }
}
