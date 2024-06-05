package com.medbuddy.medbuddy.services;

import com.medbuddy.medbuddy.controllers.responsebodies.NotificationsResponseBodies;
import com.medbuddy.medbuddy.models.Notification;
import com.medbuddy.medbuddy.repository.daos.NotificationsDAO;
import com.medbuddy.medbuddy.utilitaries.SecurityUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class NotificationsService {
    @Autowired
    private NotificationsDAO notificationsDAO;
    @Autowired
    private UserService userService;

    public List<NotificationsResponseBodies.NotificationResponseBody> getAllNotifications(UUID id) {
        List<Notification> notifications = notificationsDAO.getAllNotifications(id);
        List<NotificationsResponseBodies.NotificationResponseBody> notificationBodies = new ArrayList<>();
        for(var notification: notifications) {
            notificationBodies.add(new NotificationsResponseBodies.NotificationResponseBody(userService, notification));
        }
        return notificationBodies;
    }

    public void sendNotification(UUID medicId, String diagnosis) {
        Notification notification = new Notification();
        notification.setId(SecurityUtil.getNewId());
        notification.setMedicId(medicId);
        notification.setPatientId(userService.getUserIdByEmail(SecurityUtil.getEmail()));
        notification.setDiagnosis(diagnosis);
        notificationsDAO.addNotification(notification);
    }

    public void deleteNotification(UUID notificationId) {
        notificationsDAO.deleteNotification(notificationId);
    }
}
