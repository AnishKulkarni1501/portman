package org.anish.project.portfolio.controller;

import org.anish.project.portfolio.service.NotificationService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin("*")
public class NotificationController {

    private final NotificationService service;

    public NotificationController(NotificationService service) {
        this.service = service;
    }

    @GetMapping("/{userId}")
    public List<String> get(@PathVariable Long userId) {
        return service.getNotifications(userId);
    }
}