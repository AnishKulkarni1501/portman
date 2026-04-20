package org.anish.project.portfolio.model;

import jakarta.persistence.*;

@Entity
@Table(name = "watchlist")
public class Watchlist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "watchlist_id")
    private Long id;

    private String symbol;

    @Column(name = "user_id") // 🔥 THIS LINE IS CRITICAL
    private Long userId;

    public Long getId() { return id; }
    public String getSymbol() { return symbol; }
    public Long getUserId() { return userId; }

    public void setId(Long id) { this.id = id; }
    public void setSymbol(String symbol) { this.symbol = symbol; }
    public void setUserId(Long userId) { this.userId = userId; }
}