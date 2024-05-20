package com.medbuddy.medbuddy.controllers;

import com.medbuddy.medbuddy.models.Medic;
import com.medbuddy.medbuddy.models.User;
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

    @GetMapping("/getuserid/{email}")
    public ResponseEntity<Map<String, UUID>> getUserId(@PathVariable String email) {
        UUID userId = userService.getUserIdByEmail(email);
        Map<String, UUID> response = new HashMap<>();
        response.put("id", userId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/signup")
    public ResponseEntity<Void> signUp(@RequestBody User user) {
        userService.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/viewprofile/{userId}")
    public ResponseEntity<User> viewProfile(@PathVariable UUID userId) {
        User profile = userService.getUser(userId);
        return ResponseEntity.ok(profile);
    }

    @GetMapping("/getbasicinfo/{userId}")
    public ResponseEntity<User> getBasicInfo(@PathVariable UUID userId) {
        User basicInfo = userService.getUser(userId);
        return ResponseEntity.ok(basicInfo);
    }

    @GetMapping("/viewmedicprofile/{userId}")
    public ResponseEntity<Medic> viewMedicProfile(@PathVariable UUID userId) {
        Medic medicProfile = userService.getMedicProfile(userId);
        return ResponseEntity.ok(medicProfile);
    }

    @PatchMapping("/changeprofile/{userId}")
    public ResponseEntity<Void> changeProfile(@PathVariable UUID userId, @RequestBody User user) {
        userService.updateUser(userId, user);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/softdeleteuser/{userId}")
    public ResponseEntity<Void> softDeleteUser(@PathVariable UUID userId) {
        userService.softDeleteUser(userId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/harddeleteuser/{userId}")
    public ResponseEntity<Void> hardDeleteUser(@PathVariable UUID userId) {
        userService.hardDeleteUser(userId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/ismedic/{userId}")
    public ResponseEntity<Map<String, Boolean>> isMedic(@PathVariable UUID userId) {
        boolean isMedic = userService.isMedic(userId);
        Map<String, Boolean> response = new HashMap<>();
        response.put("isMedic", isMedic);
        return ResponseEntity.ok(response);
    }
}
