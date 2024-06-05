package com.medbuddy.medbuddy.controllers;

import com.medbuddy.medbuddy.controllers.requestbodies.NotificationRequestBody;
import com.medbuddy.medbuddy.controllers.responsebodies.NotificationsResponseBodies;
import com.medbuddy.medbuddy.services.NotificationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/medbuddy")
public class NotificationsController {
    @Autowired
    private NotificationsService notificationsService;

    @GetMapping("getallnotifications/{id}")
    public NotificationsResponseBodies.NotificationsListResponseBody getAllNotifications(@PathVariable UUID id) {
        List<NotificationsResponseBodies.NotificationResponseBody> notifications = notificationsService.getAllNotifications(id);
        return new NotificationsResponseBodies.NotificationsListResponseBody(notifications.size(), notifications);
    }

    @PostMapping("/sendnotification/{medicId}")
    public void sendNotification(@PathVariable UUID medicId, @RequestBody NotificationRequestBody body) {
        notificationsService.sendNotification(medicId, body.getDiagnosis());
    }

    @DeleteMapping("/deletenotification/{notificationId}")
    public void deleteNotification(@PathVariable UUID notificationId) {
        notificationsService.deleteNotification(notificationId);
    }
}
