package org.anish.project.portfolio.service;

import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class ReportService {

    private final PortfolioService portfolioService;

    public ReportService(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

    public String generate(Long userId) {

        Map<String, Double> data = portfolioService.calculateProfit(userId);

        return "Portfolio Report\n" +
                "Invested: " + data.get("invested") + "\n" +
                "Current: " + data.get("current") + "\n" +
                "Profit: " + data.get("profit");
    }
}