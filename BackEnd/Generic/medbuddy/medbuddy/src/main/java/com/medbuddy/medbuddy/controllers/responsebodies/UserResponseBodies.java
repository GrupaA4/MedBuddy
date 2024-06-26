package com.medbuddy.medbuddy.controllers.responsebodies;

import com.medbuddy.medbuddy.models.Medic;
import com.medbuddy.medbuddy.models.User;
import com.medbuddy.medbuddy.utilitaries.DataConvertorUtil;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

public class UserResponseBodies {
    @Data
    public static class UserProfile {
        private String email;
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
        private String profileImage;
        //private String profileImage;
        private String imageExtension;
        private boolean isAdmin;

        public UserProfile(User user, String profileImage) {
            email = user.getEmail();
            lastName = user.getLastName();
            firstName = user.getFirstName();
            gender = user.isGender();
            pronoun1 = user.getPronoun1();
            pronoun2 = user.getPronoun2();
            dateOfBirth = DataConvertorUtil.turnLocalDateToDDMMYYYY(user.getDateOfBirth());
            language = user.getLanguage();
            country = user.getCountry();
            city = user.getCity();
            phoneNumber = user.getPhoneNumber();
            this.profileImage = profileImage;
            imageExtension = user.getImageExtension();
            isAdmin = user.isAdmin();
        }
    }

    @Data
    public static class UserBasicInfo {
        private String email;
        private String lastName;
        private String firstName;
        private String  profileImage;
        //private String profileImage;
        private String imageExtension;

        public UserBasicInfo(User user, String profileImage) {
            email = user.getEmail();
            lastName = user.getLastName();
            firstName = user.getFirstName();
            this.profileImage = profileImage;
            imageExtension = user.getImageExtension();
        }
    }

    @Data
    public static class MedicProfile {
        private String email;
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
//        private String profileImage;
        private String profileImage;
        private String imageExtension;
        private boolean isAdmin;
        private String typeOfMedic;
        private String clinic;
//        private String certificateImage;
        private String certificateImage;
        private String certificateExtension;
        private boolean isApproved;

        public MedicProfile(Medic medic, String profileImage, String certificateImage) {
            email = medic.getEmail();
            lastName = medic.getLastName();
            firstName = medic.getFirstName();
            gender = medic.isGender();
            pronoun1 = medic.getPronoun1();
            pronoun2 = medic.getPronoun2();
            dateOfBirth = DataConvertorUtil.turnLocalDateToDDMMYYYY(medic.getDateOfBirth());
            language = medic.getLanguage();
            country = medic.getCountry();
            city = medic.getCity();
            phoneNumber = medic.getPhoneNumber();
            this.profileImage = profileImage;
            imageExtension = medic.getImageExtension();
            isAdmin = medic.isAdmin();
            typeOfMedic = medic.getTypeOfMedic();
            clinic = medic.getClinic();
            this.certificateImage = certificateImage;
            certificateExtension = medic.getCertificateExtension();
            isApproved = medic.isApproved();
        }
    }

    @AllArgsConstructor
    @Data
    public static class IsMedic {
        private boolean isMedic;
    }
}
