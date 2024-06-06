package com.medbuddy.medbuddy.controllers;

import com.medbuddy.medbuddy.controllers.requestbodies.AdminFunctionalityRequestBody;
import com.medbuddy.medbuddy.controllers.responsebodies.AdminFunctionalityResponseBodies;
import com.medbuddy.medbuddy.models.Medic;
import com.medbuddy.medbuddy.models.Report;
import com.medbuddy.medbuddy.models.User;
import com.medbuddy.medbuddy.repository.daos.UserDAO;
import com.medbuddy.medbuddy.services.AdminFunctionalityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
public class AdminFunctionalityController {
    @Autowired
    private AdminFunctionalityService adminFunctionalityService;
    @Autowired
    private UserDAO userDao;

    //works
    @PostMapping(value = "/medbuddy/reportuser/{userToReportId}")
    public void reportUser(@PathVariable UUID userToReportId, @RequestBody AdminFunctionalityRequestBody body) {
        if (userDao.isAdmin()) {
            adminFunctionalityService.reportUser(
                    userToReportId,
                    body.getReportMessage()
            );
        }
    }

    //works
    @GetMapping(value = "/medbuddy/getreports/{reportToStartWith}/{reportToEndLoad}")
    public AdminFunctionalityResponseBodies.GetReports getReports(@PathVariable int reportToStartWith, @PathVariable int reportToEndLoad) {
        if (userDao.isAdmin()) {
            List<Report> reports = adminFunctionalityService.getReports(reportToStartWith, reportToEndLoad);
            return new AdminFunctionalityResponseBodies.GetReports(reports.size(), reports);
        }
        return null;
    }

    //works
    @GetMapping(value = "/medbuddy/getoldestusers/{userToStartFrom}/{userToEndLoad}")
    public AdminFunctionalityResponseBodies.GetOldestUsers getOldestUsers(@PathVariable int userToStartFrom, @PathVariable int userToEndLoad) {
        if (userDao.isAdmin()) {
            List<User> users = adminFunctionalityService.getOldestUsers(userToStartFrom, userToEndLoad);
            return new AdminFunctionalityResponseBodies.GetOldestUsers(users.size(), users);
        }
        return null;
    }

    //works
    @PatchMapping(value = "/medbuddy/allowmedic/{medicId}")
    public void allowMedic(@PathVariable UUID medicId) {
        if (userDao.isAdmin()) {
            adminFunctionalityService.allowMedic(medicId);
        }
    }

    @GetMapping(value = "/medbuddy/seerequestingmedics")
    public AdminFunctionalityResponseBodies.GetRequestingMedics getRequestingMedics() {
        if (userDao.isAdmin()) {
            List<Medic> entries = adminFunctionalityService.getRequestingMedics();
            return new AdminFunctionalityResponseBodies.GetRequestingMedics(entries.size(), entries);
        }
        return null;
    }

    //works
    @GetMapping(value = "/medbuddy/finduserbyname/{userName}")
    public AdminFunctionalityResponseBodies.FindUserByName findUserByName(@PathVariable String userName) {
        if (userDao.isAdmin()) {
            List<User> users = adminFunctionalityService.findUserByName(userName);
            return new AdminFunctionalityResponseBodies.FindUserByName(users.size(), users);
        }
        return null;
    }
}
