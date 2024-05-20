package com.medbuddy.medbuddy.controllers;

import com.medbuddy.medbuddy.controllers.requestbodies.AdminFunctionalityRequestBody;
import com.medbuddy.medbuddy.controllers.responsebodies.AdminFunctionalityResponseBodies;
import com.medbuddy.medbuddy.models.Medic;
import com.medbuddy.medbuddy.models.Report;
import com.medbuddy.medbuddy.models.User;
import com.medbuddy.medbuddy.services.AdminFunctionalityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
public class AdminFunctionalityController {
    @Autowired
    private AdminFunctionalityService adminFunctionalityService;

    @GetMapping(value = "/medbuddy/getoldestusers/{userToStartFrom}/{userToEndLoad}")
    public AdminFunctionalityResponseBodies.GetOldestUsers getOldestUsers(@PathVariable int fromUser, @PathVariable int toUser) throws Exception {
        List<User> entries = adminFunctionalityService.getOldestUsers(fromUser, toUser);
        return new AdminFunctionalityResponseBodies.GetOldestUsers(entries.size(), entries);
    }

    @GetMapping(value = "/medbuddy/finduserbyname/{userName}")
    public AdminFunctionalityResponseBodies.FindUserByName findUserByName(@PathVariable String username) throws Exception {
        List<User> entries = adminFunctionalityService.findUserByName(username);
        return new AdminFunctionalityResponseBodies.FindUserByName(entries.size(), entries);
    }

    @PostMapping(value = "/medbuddy/reportuser/{userToReportId}")
    public void reportUser(@PathVariable UUID reportedUserId, @RequestBody AdminFunctionalityRequestBody body) {
        adminFunctionalityService.reportUser(
                UUID.fromString("4ac54007-cc86-4a68-beb3-12a73b9a7d0b"),
                reportedUserId,
                body.getMessage()
        );
    }

    @GetMapping(value = "/medbuddy/getreports/{reportToStartWith}/{reportToEndLoad}")
    public AdminFunctionalityResponseBodies.GetReports getReports(@PathVariable int fromReport, @PathVariable int toReport) throws Exception {
        List<Report> entries = adminFunctionalityService.getReports(fromReport, toReport);
        return new AdminFunctionalityResponseBodies.GetReports(entries.size(), entries);
    }

    @PatchMapping(value = "/medbuddy/allowmedic/{medicId}")
    public void allowMedic(@PathVariable UUID medicId) {
        adminFunctionalityService.allowMedic(medicId);
    }

    @GetMapping(value = "/medbuddy/seerequestingmedics")
    public AdminFunctionalityResponseBodies.GetRequestingMedics getRequestingMedics(@PathVariable int fromReport, @PathVariable int toReport) throws Exception {
        List<Medic> entries = adminFunctionalityService.getRequestingMedics();
        return new AdminFunctionalityResponseBodies.GetRequestingMedics(entries.size(), entries);
    }
}
