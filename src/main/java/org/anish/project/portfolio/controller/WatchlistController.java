package org.anish.project.portfolio.controller;

import org.anish.project.portfolio.model.Watchlist;
import org.anish.project.portfolio.repository.WatchlistRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/watchlist")
@CrossOrigin("*")
public class WatchlistController {

    private final WatchlistRepository repo;

    public WatchlistController(WatchlistRepository repo) {
        this.repo = repo;
    }

    @PostMapping("/add")
    public Watchlist add(@RequestBody Watchlist w) {
        System.out.println("Saving: " + w.getSymbol() + " user: " + w.getUserId());
        return repo.save(w);
    }

    @GetMapping("/{userId}")
    public List<Watchlist> get(@PathVariable Long userId) {
        return repo.findByUserId(userId);
    }

    @DeleteMapping("/{id}")
    public void remove(@PathVariable Long id) {
        repo.deleteById(id);
    }
}