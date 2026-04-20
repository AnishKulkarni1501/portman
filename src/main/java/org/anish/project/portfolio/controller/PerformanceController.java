package org.anish.project.portfolio.controller;
import org.anish.project.portfolio.service.PerformanceService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/performance")
@CrossOrigin("*")
public class PerformanceController {

    private final PerformanceService service;

    public PerformanceController(PerformanceService service) {
        this.service = service;
    }

    @GetMapping("/{userId}")
    public Map<String, Double> get(@PathVariable Long userId) {
        return service.analyze(userId);
    }
}