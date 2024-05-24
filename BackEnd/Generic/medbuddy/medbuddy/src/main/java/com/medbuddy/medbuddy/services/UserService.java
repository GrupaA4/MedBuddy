package com.medbuddy.medbuddy.services;

import com.medbuddy.medbuddy.exceptions.NotFoundExceptions;
import com.medbuddy.medbuddy.models.Medic;
import com.medbuddy.medbuddy.models.User;
import com.medbuddy.medbuddy.repository.daos.UserDAO;
import com.medbuddy.medbuddy.utilitaries.SecurityUtil;
import com.medbuddy.medbuddy.utilitaries.validators.EntityValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.xml.validation.Validator;
import java.time.LocalDate;
import java.util.UUID;

@Service
public class UserService {

    private final UserDAO userDAO;

    @Autowired
    public UserService(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    public boolean loginUser(String email, String password) {
        return userDAO.loginUser(email, password);//throws exceptions if email doesn't exist
    }

    public UUID getUserIdByEmail(String email) {
        UUID id = userDAO.getUserId(email);

        User user = userDAO.getUserById(id);
        if(EntityValidator.validate(user)) {
            return id;
        } else {
            throw new NotFoundExceptions.UserNotFound("User with email " + email + " was not found");
        }
    }

    public void createUser(User userRequest) {

        userDAO.checkIfUserWithEmailExists(userRequest.getEmail());//will throw exceptions if that happens

        userRequest.setId(SecurityUtil.getNewId());

        int imageNumber = userDAO.getMaxImageNumber() + 1;
        //add profile image to database
        userRequest.setProfileImageNumber(imageNumber);

        userRequest.setLastTimeLoggedIn(LocalDate.now());
        userRequest.setDeleted(false);

        userDAO.signupUser(userRequest);
    }

    public void createMedic(Medic medicRequest) {

        userDAO.checkIfUserWithEmailExists(medicRequest.getEmail());//will throw exceptions if that happens

        medicRequest.setId(SecurityUtil.getNewId());

        int imageNumber = userDAO.getMaxImageNumber() + 1;
        //add profile image to database
        medicRequest.setProfileImageNumber(imageNumber);

        medicRequest.setLastTimeLoggedIn(LocalDate.now());
        medicRequest.setDeleted(false);

        userDAO.signupUser(medicRequest);

        medicRequest.setMedicId(SecurityUtil.getNewId());

        int certificateNumber = userDAO.getMaxImageNumber() + 1;
        //add certificate image to database
        medicRequest.setProfileImageNumber(certificateNumber);

        medicRequest.setApproved(false);

        userDAO.signupMedic(medicRequest);
    }

    public User getUser(UUID userId) {
        User user = userDAO.getUserById(userId);

        if(EntityValidator.validate(user)) {
            return user;
        } else {
            throw new NotFoundExceptions.UserNotFound("User with id " + userId + "was not found");
        }
    }

    public Medic getMedicProfile(UUID userId) {
        User user = userDAO.getUserById(userId);

        if(!EntityValidator.validate(user)) {
            throw new NotFoundExceptions.UserNotFound("No user with this id " + userId + " was found");
        }

        Medic medic = userDAO.getMedicSpecificInfoByUserId(userId);

        return new Medic();
    }

    public void updateUser(UUID userId, User userRequest) {
        User user = userDAO.getUserById(userId);
        user.setEmail(userRequest.getEmail());
        user.setPassword(userRequest.getPassword());
        user.setLastName(userRequest.getLastName());
        user.setFirstName(userRequest.getFirstName());
        user.setGender(userRequest.isGender());
        user.setPronoun1(userRequest.getPronoun1());
        user.setPronoun2(userRequest.getPronoun2());
        user.setDateOfBirth(userRequest.getDateOfBirth());
        user.setLanguage(userRequest.getLanguage());
        user.setCountry(userRequest.getCountry());
        user.setCity(userRequest.getCity());
        user.setPhoneNumber(userRequest.getPhoneNumber());
        user.setProfileImageNumber(userRequest.getProfileImageNumber());
        user.setAdmin(userRequest.isAdmin());
        user.setDeleted(userRequest.isDeleted());

        userDAO.updateUser(user);
    }

    public void softDeleteUser(UUID userId) {
        userDAO.markUserAsDeleted(userId);
    }

    public void hardDeleteUser(UUID userId) {
        userDAO.deleteUser(userId);
    }

    public boolean isMedic(UUID userId) {
        JdbcTemplate jdbcTemplate = null;
        String query = "SELECT COUNT(*) FROM medic WHERE id = ?";
        Integer count = jdbcTemplate.queryForObject(query, new Object[]{userId}, Integer.class);
        return count != null && count > 0;
    }
}
