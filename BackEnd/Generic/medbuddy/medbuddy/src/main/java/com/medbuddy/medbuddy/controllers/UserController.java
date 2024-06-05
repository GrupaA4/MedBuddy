package com.medbuddy.medbuddy.controllers;

import com.medbuddy.medbuddy.controllers.requestbodies.UserRequestBodies;
import com.medbuddy.medbuddy.controllers.responsebodies.UserResponseBodies;
import com.medbuddy.medbuddy.exceptions.UserDidSomethingWrongExceptions;
import com.medbuddy.medbuddy.models.Medic;
import com.medbuddy.medbuddy.models.User;
import com.medbuddy.medbuddy.utilitaries.ImageProcessingUtil;
import com.medbuddy.medbuddy.utilitaries.SecurityUtil;
import com.medbuddy.medbuddy.utilitaries.validators.EntityValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.medbuddy.medbuddy.services.UserService;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/medbuddy")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    //works
    @GetMapping("/login")
    public Map<String, String> login() {
        String email = SecurityUtil.getEmail();
        UUID id = userService.getUserIdByEmail(email);
        User user = userService.getUser(id);

        if(!EntityValidator.validate(user)) {
            throw new UserDidSomethingWrongExceptions.UserCredentialsNotFound(null);
        }

        Map<String, String> response = new HashMap<>();
        if(user.isAdmin()) {
            response.put("type", "Admin");
            return response;
        }
        if(userService.isMedic(id)) {
            Medic medic = userService.getMedicProfile(id);
            if(!medic.isApproved()) {
                throw new UserDidSomethingWrongExceptions.UserCredentialsNotFound(null);
            }
            response.put("type", "Medic");
            return response;
        }
        response.put("type", "Patient");
        return response;
    }

    //works
    @GetMapping("/getuserid/{email}")
    public ResponseEntity<Map<String, UUID>> getUserId(@PathVariable String email) {
        UUID userId = userService.getUserIdByEmail(email);
        Map<String, UUID> response = new HashMap<>();
        response.put("id", userId);
        return ResponseEntity.ok(response);
    }

    //works
    @PutMapping("/signup")
    public ResponseEntity<Void> signUp(@RequestBody UserRequestBodies.UserSignup userRequest) {
        User user = new User(userRequest);
        userService.createUser(user, ImageProcessingUtil.getImageDataAsBytes(userRequest.getProfileImage()));
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    //works mostly (certificate image number is not right)
    @PutMapping("/signupmedic")
    public ResponseEntity<Void> signUpMedic(@RequestBody UserRequestBodies.MedicSignup medicRequest) {
        Medic medic = new Medic(medicRequest);
        userService.createMedic(medic,
                ImageProcessingUtil.getImageDataAsBytes(medicRequest.getProfileImage()),
                ImageProcessingUtil.getImageDataAsBytes(medicRequest.getCertificateImage()));
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    //works
    @GetMapping("/viewprofile/{userId}")
    public UserResponseBodies.UserProfile viewProfile(@PathVariable UUID userId) {
        User user = userService.getUser(userId);
        return new UserResponseBodies.UserProfile(user,
                ImageProcessingUtil.extractImage(user.getProfileImageNumber(), user.getImageExtension(), "C:\\Users\\Laura\\Documents\\ip2\\med\\MedBuddy\\BackEnd\\Generic\\Database\\Profiles"));
    }

    //works
    @GetMapping("/getbasicinfo/{userId}")
    public UserResponseBodies.UserBasicInfo getBasicInfo(@PathVariable UUID userId) {
        User user = userService.getUser(userId);
        return new UserResponseBodies.UserBasicInfo(user,
                ImageProcessingUtil.extractImage(user.getProfileImageNumber(), user.getImageExtension(), "C:\\Users\\Laura\\Documents\\ip2\\med\\MedBuddy\\BackEnd\\Generic\\Database\\Profiles"));
    }

    //works
    @GetMapping("/getuseridofmedic/{medicId}")
    public ResponseEntity<Map<String, UUID>> getUserIdOfMedic(@PathVariable UUID medicId) {
        Map<String, UUID> idResponse = new HashMap<>();
        idResponse.put("userId", userService.getUserIdOfMedic(medicId));
        return ResponseEntity.ok(idResponse);
    }

    //works
    @GetMapping("/viewmedicprofile/{userId}")
    public UserResponseBodies.MedicProfile viewMedicProfile(@PathVariable UUID userId) {
        Medic medic = userService.getMedicProfile(userId);
        return new UserResponseBodies.MedicProfile(medic,
                ImageProcessingUtil.extractImage(medic.getProfileImageNumber(), medic.getImageExtension(), "C:\\Users\\Laura\\Documents\\ip2\\med\\MedBuddy\\BackEnd\\Generic\\Database\\Profiles"),
                ImageProcessingUtil.extractImage(medic.getCertificateImageNumber(), medic.getCertificateExtension(), "C:\\Users\\Laura\\Documents\\ip2\\med\\MedBuddy\\BackEnd\\Generic\\Database\\Certificates"));
    }

    //works (mostly, image problems)
    @PatchMapping("/changeprofile/{userId}")
    public void changeProfile(@PathVariable UUID userId, @RequestBody UserRequestBodies.UserChange newUserInfo) {
        userService.updateUser(userId, new User(newUserInfo));
    }

    //works
    @PatchMapping("/softdeleteuser/{userId}")
    public void softDeleteUser(@PathVariable UUID userId) {
        userService.softDeleteUser(userId);
    }

    //works
    @DeleteMapping("/harddeleteuser/{userId}")
    public void hardDeleteUser(@PathVariable UUID userId) {
        userService.hardDeleteUser(userId);
    }

    //works
    @GetMapping("/ismedic/{userId}")
    public UserResponseBodies.IsMedic isMedic(@PathVariable UUID userId) {
        return new UserResponseBodies.IsMedic(userService.isMedic(userId));
    }
}