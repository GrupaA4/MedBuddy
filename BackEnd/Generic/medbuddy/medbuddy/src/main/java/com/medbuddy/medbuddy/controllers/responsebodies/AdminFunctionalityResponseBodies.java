package com.medbuddy.medbuddy.controllers.responsebodies;

import com.medbuddy.medbuddy.models.Medic;
import com.medbuddy.medbuddy.models.Report;
import com.medbuddy.medbuddy.models.User;
import com.medbuddy.medbuddy.utilitaries.DataConvertorUtil;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class AdminFunctionalityResponseBodies {
    @Data
    public static class GetOldestUsers {
        private int numbersOfUsersReturned;
        private List<UUID> users;

        public GetOldestUsers(int numbersOfUsersReturned, List<User> users) {
            this.numbersOfUsersReturned = numbersOfUsersReturned;
            this.users = new ArrayList<>();
            for(var user : users) {
                this.users.add(user.getId());
            }
        }
    }

    @Data
    public static class FindUserByName {
        private int numbersOfUsersReturned;
        private List<UUID> users;

        public FindUserByName(int numbersOfUsersReturned, List<User> users) {
            this.numbersOfUsersReturned = numbersOfUsersReturned;
            this.users = new ArrayList<>();
            for(var user : users) {
                this.users.add(user.getId());
            }
        }
    }

    @Data
    public static class GetReports {
        private int numbersOfReportsReturned;
        private List<ReportBasicInfo> reports;

        public GetReports(int numbersOfReportsReturned, List<Report> reports) {
            this.numbersOfReportsReturned = numbersOfReportsReturned;
            this.reports = new ArrayList<>();
            for(var report : reports) {
                this.reports.add(new ReportBasicInfo(report));
            }
        }
    }

    @Data
    public static class ReportBasicInfo {
        private UUID reportedUserId;
        private UUID reporterUserId;
        private String message;
        private String timeCreated;

        public ReportBasicInfo(Report report) {
            reportedUserId = report.getReportedUser();
            reporterUserId = report.getReportedBy();
            message = report.getReportMessage();
            timeCreated = DataConvertorUtil.turnLocalDateToDDMMYYYY(report.getTimeCreated());
        }
    }

    @Data
    public static class GetRequestingMedics {
        private int numbersOfMedicsReturned;
        private List<UUID> medics;

        public GetRequestingMedics(int numbersOfMedicsReturned, List<Medic> medics) {
            this.numbersOfMedicsReturned = numbersOfMedicsReturned;
            this.medics = new ArrayList<>();
            for(var medic : medics) {
                this.medics.add(medic.getId());
            }
        }
    }
}
