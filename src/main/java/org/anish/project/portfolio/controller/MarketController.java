package org.anish.project.portfolio.controller;

import org.anish.project.portfolio.service.MarketServiceData;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/market")
@CrossOrigin("*")
public class MarketController {

    private final MarketServiceData service;

    public MarketController(MarketServiceData service) {
        this.service = service;
    }

    @GetMapping("/{symbol}")
    public String getStock(@PathVariable String symbol) {
        return service.getStockPrice(symbol);
    }
}