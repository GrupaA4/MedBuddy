package com.medbuddy.medbuddy.services;

import com.medbuddy.medbuddy.exceptions.NotFoundExceptions;
import com.medbuddy.medbuddy.models.Medic;
import com.medbuddy.medbuddy.models.User;
import com.medbuddy.medbuddy.repository.daos.UserDAO;
import com.medbuddy.medbuddy.utilitaries.ImageProcessingUtil;
import com.medbuddy.medbuddy.utilitaries.SecurityUtil;
import com.medbuddy.medbuddy.utilitaries.validators.EntityValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.xml.validation.Validator;
import java.time.LocalDate;
import java.util.UUID;

@Service
public class UserService {
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserDAO userDAO;

    public boolean loginUser(String email, String password) {
        return userDAO.loginUser(email, password);// throws exceptions if email doesn't exist
    }

    public UUID getUserIdByEmail(String email) {
        UUID id = userDAO.getUserId(email);

        User user = userDAO.getUserById(id);
        if (EntityValidator.validate(user)) {
            return id;
        } else {
            throw new NotFoundExceptions.UserNotFound("User with email " + email + " was not found");
        }
    }

    public void createUser(User userRequest, byte[] profileImage) {

        userDAO.checkIfUserWithEmailExists(userRequest.getEmail());// will throw exceptions if that happens

        userRequest.setId(SecurityUtil.getNewId());
        String password = userRequest.getPassword();
        userRequest.setPassword(passwordEncoder.encode(password));

        int imageNumber = userDAO.getMaxImageNumber() + 1;
        ImageProcessingUtil.saveImage(imageNumber, "src\\Database\\Profiles", profileImage,
                userRequest.getImageExtension());
        userRequest.setProfileImageNumber(imageNumber);

        userRequest.setLastTimeLoggedIn(LocalDate.now());
        userRequest.setDeleted(false);

        userDAO.signupUser(userRequest);
    }

    public void createMedic(Medic medicRequest, byte[] profileImage, byte[] certificateImage) {

        userDAO.checkIfUserWithEmailExists(medicRequest.getEmail());// will throw exceptions if that happens

        medicRequest.setId(SecurityUtil.getNewId());
        String password = medicRequest.getPassword();
        medicRequest.setPassword(passwordEncoder.encode(password));

        int imageNumber = userDAO.getMaxImageNumber() + 1;
        // add profile image to database
        ImageProcessingUtil.saveImage(imageNumber, "src\\Database\\Profiles", profileImage,
                medicRequest.getImageExtension());
        medicRequest.setProfileImageNumber(imageNumber);

        medicRequest.setLastTimeLoggedIn(LocalDate.now());
        medicRequest.setDeleted(false);

        userDAO.signupUser(medicRequest);// automatically maps to a user

        medicRequest.setMedicId(SecurityUtil.getNewId());

        int certificateNumber = userDAO.getMaxCertificateNumber() + 1;
        // add certificate image to database
        ImageProcessingUtil.saveImage(certificateNumber, "src\\Database\\Certificates", certificateImage,
                medicRequest.getCertificateExtension());
        medicRequest.setProfileImageNumber(certificateNumber);

        medicRequest.setApproved(false);

        userDAO.signupMedic(medicRequest);
    }

    public User getUser(UUID userId) {
        User user = userDAO.getUserById(userId);

        if (EntityValidator.validate(user)) {
            return user;
        } else {
            throw new NotFoundExceptions.UserNotFound("User with id " + userId + "was not found");
        }
    }

    public UUID getUserIdOfMedic(UUID medicId) {
        UUID userId = userDAO.getUserIdOfMedic(medicId);

        User user = userDAO.getUserById(userId);

        if (EntityValidator.validate(user)) {
            return userId;
        } else {
            throw new NotFoundExceptions.UserNotFound("Medic with id " + medicId + "was not found");
        }
    }

    public Medic getMedicProfile(UUID userId) {
        User user = userDAO.getUserById(userId);

        if (!EntityValidator.validate(user)) {
            throw new NotFoundExceptions.UserNotFound("No user with this id " + userId + " was found");
        }

        return new Medic(user, userDAO.getMedicSpecificInfoByUserId(userId));
    }

    public void updateUser(UUID userId, User userRequest) {
        User user = userDAO.getUserById(userId);

        if (!EntityValidator.validate(user)) {
            throw new NotFoundExceptions.UserNotFound("No user with this id " + userId + " was found");
        }

        String password = userRequest.getPassword();
        userRequest.setPassword(passwordEncoder.encode(password));

        userDAO.updateUser(userRequest, userId);
    }

    public void softDeleteUser(UUID userId) {
        userDAO.markUserAsDeleted(userId);
        userDAO.softDeleteReportsOnUser(userId);
        userDAO.softDeleteMedicalHistoryForUser(userId);
        userDAO.deleteReportsMadeByUser(userId);
        // delete conversations
        // delete messages
        // delete reports
        // delete medical history
    }

    public void hardDeleteUser(UUID userId) {
        userDAO.deleteUser(userId);
    }

    public boolean isMedic(UUID userId) {
        return userDAO.isMedic(userId);
    }
}
