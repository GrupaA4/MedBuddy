package com.medbuddy.medbuddy.controllers.responsebodies;

import com.medbuddy.medbuddy.models.Medic;
import com.medbuddy.medbuddy.models.Report;
import com.medbuddy.medbuddy.models.User;
import lombok.Data;

import java.util.List;

public class AdminFunctionalityResponseBodies {
    @Data
    public static class GetOldestUsers {
        private int numbersOfUsersReturned;
        private List<User> users;

        public GetOldestUsers(int numbersOfUsersReturned, List<User> users) {
            this.numbersOfUsersReturned = numbersOfUsersReturned;
            this.users = users;
        }
    }

    @Data
    public static class FindUserByName {
        private int numbersOfUsersReturned;
        private List<User> users;

        public FindUserByName(int numbersOfUsersReturned, List<User> users) {
            this.numbersOfUsersReturned = numbersOfUsersReturned;
            this.users = users;
        }
    }

    @Data
    public static class GetReports {
        private int numbersOfReportsReturned;
        private List<Report> reports;

        public GetReports(int numbersOfReportsReturned, List<Report> reports) {
            this.numbersOfReportsReturned = numbersOfReportsReturned;
            this.reports = reports;
        }
    }

    @Data
    public static class GetRequestingMedics {
        private int numbersOfMedicsReturned;
        private List<Medic> medics;

        public GetRequestingMedics(int numbersOfMedicsReturned, List<Medic> medics) {
            this.numbersOfMedicsReturned = numbersOfMedicsReturned;
            this.medics = medics;
        }
    }
}
