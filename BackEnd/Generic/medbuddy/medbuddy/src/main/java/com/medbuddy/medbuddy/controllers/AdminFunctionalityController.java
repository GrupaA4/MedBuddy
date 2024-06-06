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

    //works
    @PostMapping(value = "/medbuddy/reportuser/{userToReportId}")
    public void reportUser(@PathVariable UUID userToReportId, @RequestBody AdminFunctionalityRequestBody body) {
        adminFunctionalityService.reportUser(
                userToReportId,
                body.getReportMessage()
        );
    }

    //works
    @GetMapping(value = "/medbuddy/getreports/{reportToStartWith}/{reportToEndLoad}")
    public AdminFunctionalityResponseBodies.GetReports getReports(@PathVariable int reportToStartWith, @PathVariable int reportToEndLoad) {
        List<Report> reports = adminFunctionalityService.getReports(reportToStartWith, reportToEndLoad);
        return new AdminFunctionalityResponseBodies.GetReports(reports.size(), reports);
    }

    //works
    @GetMapping(value = "/medbuddy/getoldestusers/{userToStartFrom}/{userToEndLoad}")
    public AdminFunctionalityResponseBodies.GetOldestUsers getOldestUsers(@PathVariable int userToStartFrom, @PathVariable int userToEndLoad) {
        List<User> users = adminFunctionalityService.getOldestUsers(userToStartFrom, userToEndLoad);
        return new AdminFunctionalityResponseBodies.GetOldestUsers(users.size(), users);
    }

    //works
    @PatchMapping(value = "/medbuddy/allowmedic/{userId}")
    public void allowMedic(@PathVariable UUID userId) {
        adminFunctionalityService.allowMedic(userId);
    }

    @GetMapping(value = "/medbuddy/seerequestingmedics")
    public AdminFunctionalityResponseBodies.GetRequestingMedics getRequestingMedics() {
        List<Medic> entries = adminFunctionalityService.getRequestingMedics();
        return new AdminFunctionalityResponseBodies.GetRequestingMedics(entries.size(), entries);
    }

    //works
    @GetMapping(value = "/medbuddy/finduserbyname/{userName}")
    public AdminFunctionalityResponseBodies.FindUserByName findUserByName(@PathVariable String userName) {
        List<User> users = adminFunctionalityService.findUserByName(userName);
        return new AdminFunctionalityResponseBodies.FindUserByName(users.size(), users);
    }
}
