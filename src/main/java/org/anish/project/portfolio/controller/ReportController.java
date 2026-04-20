package org.anish.project.portfolio.controller;

import org.anish.project.portfolio.service.ReportService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/report")
@CrossOrigin("*")
public class ReportController {

    private final ReportService service;

    public ReportController(ReportService service) {
        this.service = service;
    }

    @GetMapping("/{userId}")
    public String getReport(@PathVariable Long userId) {
        return service.generate(userId);
    }
}