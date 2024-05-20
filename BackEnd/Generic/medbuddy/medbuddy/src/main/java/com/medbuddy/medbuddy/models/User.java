package com.medbuddy.medbuddy.models;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.UUID;

@Data
public class User {
    @Getter
    @Setter
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public Boolean getGender() {
        return gender;
    }

    public void setGender(Boolean gender) {
        this.gender = gender;
    }

    public String getPronoun1() {
        return pronoun1;
    }

    public void setPronoun1(String pronoun1) {
        this.pronoun1 = pronoun1;
    }

    public String getPronoun2() {
        return pronoun2;
    }

    public void setPronoun2(String pronoun2) {
        this.pronoun2 = pronoun2;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public int getPostalNumber() {
        return postalNumber;
    }

    public void setPostalNumber(int postalNumber) {
        this.postalNumber = postalNumber;
    }

    public int getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(int phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getProfileImagePath() {
        return profileImagePath;
    }

    public void setProfileImagePath(String profileImagePath) {
        this.profileImagePath = profileImagePath;
    }

    public Boolean getAdmin() {
        return isAdmin;
    }

    public void setAdmin(Boolean admin) {
        isAdmin = admin;
    }

    public Boolean getDeleted() {
        return isDeleted;
    }

    public void setDeleted(Boolean deleted) {
        isDeleted = deleted;
    }

    public User() {

    }

}
