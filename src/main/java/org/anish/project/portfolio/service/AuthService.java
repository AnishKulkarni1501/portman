package org.anish.project.portfolio.service;

import org.anish.project.portfolio.model.User;
import org.anish.project.portfolio.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository repo;

    public AuthService(UserRepository repo) {
        this.repo = repo;
    }

    public User login(String email, String password) {
        return repo.findByEmail(email)
                .filter(u -> u.getPassword().equals(password))
                .orElse(null);
    }

    public User register(User user) {
        return repo.save(user);
    }
}