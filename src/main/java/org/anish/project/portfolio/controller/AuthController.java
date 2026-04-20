package org.anish.project.portfolio.controller;

import org.anish.project.portfolio.model.User;
import org.anish.project.portfolio.service.AuthService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    private final AuthService service;

    public AuthController(AuthService service) {
        this.service = service;
    }

    @PostMapping("/login")
    public User login(@RequestBody Map<String, String> req) {
        return service.login(req.get("email"), req.get("password"));
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return service.register(user);
    }
}