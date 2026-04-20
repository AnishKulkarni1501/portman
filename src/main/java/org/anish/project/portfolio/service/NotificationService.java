package org.anish.project.portfolio.service;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class NotificationService {

    // userId -> list of messages
    private final Map<Long, List<String>> notifications = new HashMap<>();

    public void notifyUser(Long userId, String message) {

        notifications.putIfAbsent(userId, new ArrayList<>());

        notifications.get(userId).add(0, message); // latest on top

        // Optional: limit to last 10 notifications
        if (notifications.get(userId).size() > 10) {
            notifications.get(userId).remove(10);
        }

        System.out.println("NOTIFICATION: " + message);
    }

    public List<String> getNotifications(Long userId) {
        return notifications.getOrDefault(userId, new ArrayList<>());
    }
}