package com.medbuddy.medbuddy.services;

import com.medbuddy.medbuddy.exceptions.NotFoundExceptions;
import com.medbuddy.medbuddy.exceptions.UserDidSomethingWrongExceptions;
import com.medbuddy.medbuddy.models.Medic;
import com.medbuddy.medbuddy.models.Report;
import com.medbuddy.medbuddy.models.User;
import com.medbuddy.medbuddy.repository.daos.AdminFunctionalityDAO;
import com.medbuddy.medbuddy.repository.daos.UserDAO;
import com.medbuddy.medbuddy.utilitaries.SecurityUtil;
import com.medbuddy.medbuddy.utilitaries.validators.EntityValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.xml.validation.Validator;
import java.time.LocalDate;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;

import static java.lang.Math.max;
import static java.lang.Math.min;

@Service
public class AdminFunctionalityService {
    @Autowired
    private AdminFunctionalityDAO adminFunctionalityRepository;
    @Autowired
    private UserDAO userRepository;

    public void reportUser(UUID reportedUserId, String reportMessage) {
        UUID id = userRepository.getUserId(SecurityUtil.getEmail());
        User user1 = userRepository.getUserById(id);
        User user2 = userRepository.getUserById(reportedUserId);

        if (!EntityValidator.validate(user1)) {
            throw new NotFoundExceptions.UserNotFound("The user that reports was not found (id = " + id + ")");
        }

        if (!EntityValidator.validate(user2)) {
            throw new NotFoundExceptions.UserNotFound("The reported user was not found (id = " + id + ")");
        }

        Report report = new Report();
        report.setId(SecurityUtil.getNewId());
        report.setReportedBy(id);
        report.setReportedUser(reportedUserId);
        report.setReportMessage(reportMessage);
        report.setTimeCreated(LocalDate.now());
        report.setDeleted(false);
        adminFunctionalityRepository.reportUser(report);
    }

    public List<Report> getReports(int fromReport, int toReport) {
        List<Report> reportsList = adminFunctionalityRepository.getReports();
        reportsList.removeIf(report -> !EntityValidator.validate(report));
        reportsList = reportsList.subList(max(1, fromReport) - 1, min(toReport, reportsList.size()));
        return reportsList;
    }

    public List<User> getOldestUsers(int fromUser, int toUser) {
        List<User> filteredUserList = adminFunctionalityRepository.getOldestUsers();
        filteredUserList.removeIf(user -> !EntityValidator.validate(user));
        filteredUserList = filteredUserList.subList(max(1, fromUser) - 1, min(toUser, filteredUserList.size()));
        return filteredUserList;
    }

    public void allowMedic(UUID medicId) {
        UUID userId = userRepository.getUserIdOfMedic(medicId);
        User user = userRepository.getUserById(userId);
        if(!EntityValidator.validate(user)) {
            throw new NotFoundExceptions.MedicNotFound("No medic with id = " + medicId + " was found");
        }
        adminFunctionalityRepository.allowMedic(medicId);
    }

    public List<User> findUserByName(String username) {
        if (!username.contains("+") || (username.startsWith("+") && username.endsWith("+")))
            throw new UserDidSomethingWrongExceptions.TriedToGetAllUsers ("Invalid format, can't return all users or you forgot the +");
        String[] nameParts = username.split("\\+");

        if (nameParts.length > 2)
            throw new UserDidSomethingWrongExceptions.TooManyParts("Invalid format, should only have 2 parts.");

        String firstName;
        String lastName;
        List<User> users;

        if (nameParts.length == 1) {
            if (username.endsWith("+")) {
                lastName = nameParts[0];
                users = adminFunctionalityRepository.findUserByName(null, lastName);
            } else {
                firstName = nameParts[0];
                users = adminFunctionalityRepository.findUserByName(firstName, null);
            }
        } else {
            lastName = nameParts[0];
            firstName = nameParts[1];
            users = adminFunctionalityRepository.findUserByName(firstName, lastName);
        }

        users.removeIf(user -> !EntityValidator.validate(user));

        return users;
    }

    public List<Medic> getRequestingMedics() {
        List<Medic> medics = adminFunctionalityRepository.getRequestingMedics();
        Iterator<Medic> iterator = medics.iterator();
        while (iterator.hasNext()) {
            Medic medic = iterator.next();
            medic.setId(userRepository.getUserIdOfMedic(medic.getMedicId()));
            if (!EntityValidator.validate(userRepository.getUserById(medic.getId()))) {
                iterator.remove();
            }
        }
        return medics;
    }
}
