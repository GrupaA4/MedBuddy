package com.medbuddy.medbuddy.models;

import com.medbuddy.medbuddy.controllers.requestbodies.UserRequestBodies;
import com.medbuddy.medbuddy.utilitaries.DataConvertorUtil;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.UUID;

@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Data
public class Medic extends User{
    private UUID medicId;
    private String typeOfMedic;
    private String clinic;
    private int certificateImageNumber;
    private String certificateExtension;
    private boolean isApproved;

    public Medic(User user, Medic medic) {
        super(user);
        medicId = medic.medicId;
        typeOfMedic = medic.typeOfMedic;
        clinic = medic.clinic;
        certificateImageNumber = medic.certificateImageNumber;
        certificateExtension = medic.certificateExtension;
        isApproved = medic.isApproved;
    }

    public Medic(UserRequestBodies.MedicSignup medic) {
        email = medic.getEmail();
        password = medic.getPassword();
        lastName = medic.getLastName();
        firstName = medic.getFirstName();
        gender = medic.isGender();
        pronoun1 = medic.getPronoun1();
        pronoun2 = medic.getPronoun2();
        dateOfBirth = DataConvertorUtil.turnDotDateToLocalDate(medic.getDateOfBirth());
        language = medic.getLanguage();
        country = medic.getCountry();
        city = medic.getCity();
        phoneNumber = medic.getPhoneNumber();
        imageExtension = medic.getImageExtension();
        typeOfMedic = medic.getTypeOfMedic();
        clinic = medic.getClinic();
        certificateExtension = medic.getImageExtension();
    }
}
