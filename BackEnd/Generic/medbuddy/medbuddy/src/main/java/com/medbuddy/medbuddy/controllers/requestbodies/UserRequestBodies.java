package com.medbuddy.medbuddy.controllers.requestbodies;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.UUID;

public class UserRequestBodies {
    @Data
    public static class UserSignup {
        private String email;
        private String password;
        private String lastName;
        private String firstName;
        private boolean gender;
        private String pronoun1;
        private String pronoun2;
        private String dateOfBirth;
        private String language;
        private String country;
        private String city;
        private String phoneNumber;
        //private String profileImage; // placeholder
        private String profileImage;
        private String imageExtension;
        private boolean isAdmin;
    }

    @Data
    public static class MedicSignup {
        private String email;
        private String password;
        private String lastName;
        private String firstName;
        private boolean gender;
        private String pronoun1;
        private String pronoun2;
        private String dateOfBirth;
        private String language;
        private String country;
        private String city;
        private String phoneNumber;
        //private String profileImage; // placeholder
        private String profileImage;
        private String imageExtension;
        private boolean isAdmin;
        private String typeOfMedic;
        private String clinic;
        //private String certificateImage; // placeholder
        private String certificateImage;
        private String certificateExtension;
    }

    public static class UserChange extends UserSignup{
    }
}