package com.medbuddy.medbuddy.services;

import com.medbuddy.medbuddy.models.Medic;
import com.medbuddy.medbuddy.models.Report;
import com.medbuddy.medbuddy.models.User;
import com.medbuddy.medbuddy.repository.daos.AdminFunctionalityDAO;
import com.medbuddy.medbuddy.utilitaries.SecurityUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

import static java.lang.Math.max;
import static java.lang.Math.min;

@Service
public class AdminFunctionalityService {
    @Autowired
    private AdminFunctionalityDAO adminFunctionalityRepository;

    public List<User> getOldestUsers(int fromUser, int toUser) throws Exception {
        List<User> filteredUserList = adminFunctionalityRepository.getOldestUsers();
        if(filteredUserList.isEmpty()) throw new Exception("List of users is empty, can't extract the oldest users.");
        filteredUserList = filteredUserList.subList(max(1, fromUser) - 1, min(toUser, filteredUserList.size()) - 1);
        return filteredUserList;
    }

    public List<User> findUserByName(String username) throws Exception {
        if(!username.contains("+") || (username.startsWith("+") && username.endsWith("+")))
            throw new Exception("Invalid format. (Make custom exception: findUserByName)");
        String[] nameParts = username.split("\\+");

        if (nameParts.length > 2)
            throw new Exception("Invalid format, should only have 2 parts. (Make custom exception: findUserByName)");

        String firstName;
        String lastName;

        if(nameParts.length == 1){
            if(username.startsWith("+")){
                lastName=nameParts[0];
                return adminFunctionalityRepository.findUserByName(null, lastName);
            }
            else{
                firstName = nameParts[0];
                return adminFunctionalityRepository.findUserByName(firstName, null);
            }
        }
        else{
            lastName = nameParts[0];
            firstName = nameParts[1];
            return adminFunctionalityRepository.findUserByName(firstName, lastName);
        }
    }

    public int reportUser(UUID currentUserId, UUID reportedUserId, String reportMessage) {
        UUID reportId = SecurityUtil.getNewId();
        return adminFunctionalityRepository.reportUser(reportId, currentUserId, reportedUserId, reportMessage);
    }

    public List<Report> getReports(int fromReport, int toReport) throws Exception{
        List<Report> filteredUserList = adminFunctionalityRepository.getReports();
        if(filteredUserList.isEmpty()) throw new Exception("List of reports is empty, can't extract the oldest reports.");
        filteredUserList = filteredUserList.subList(max(1, fromReport) - 1, min(toReport, filteredUserList.size()) - 1);
        return filteredUserList;
    }

    public int allowMedic(UUID medicId)
    {
        return adminFunctionalityRepository.allowMedic(medicId);
    }

    public List<Medic> getRequestingMedics() {
        return adminFunctionalityRepository.getRequestingMedics();
    }
}
