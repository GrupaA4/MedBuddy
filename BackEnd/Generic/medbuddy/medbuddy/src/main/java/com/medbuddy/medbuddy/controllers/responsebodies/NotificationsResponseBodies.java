package com.medbuddy.medbuddy.controllers.responsebodies;

import com.medbuddy.medbuddy.models.Notification;
import com.medbuddy.medbuddy.models.User;
import com.medbuddy.medbuddy.services.UserService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

public abstract class NotificationsResponseBodies {
    @AllArgsConstructor
    @Data
    public static class NotificationsListResponseBody {
        private int numberOfNotificationsReturned;
        private List<NotificationResponseBody> notifications;
    }

    @NoArgsConstructor
    @AllArgsConstructor
    @Data
    public static class NotificationResponseBody {
        private UUID id;
        private String lastName;
        private String firstName;
        private String profileImage;
        //private MultiPartFile profileImage;
        private String imageExtension;
        private String email;
        private String diagnosis;

        public NotificationResponseBody(UserService userService, Notification notification) {
            id = notification.getId();
            User patient = userService.getUser(notification.getPatientId());
            lastName = patient.getLastName();
            firstName = patient.getFirstName();
            profileImage = "placeholder";//medic.getProfileImage()
            imageExtension = patient.getImageExtension();
            email = patient.getEmail();
            diagnosis = notification.getDiagnosis();
        }
    }
}
