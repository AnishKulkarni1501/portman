package org.anish.project.portfolio.service;

import org.anish.project.portfolio.model.PortfolioStock;
import org.anish.project.portfolio.repository.PortfolioRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PortfolioService {

    private final PortfolioRepository repo;
    private final MarketServiceData marketService;

    public PortfolioService(PortfolioRepository repo,
                            MarketServiceData marketService) {
        this.repo = repo;
        this.marketService = marketService;
    }

    public Map<String, Double> calculateProfit(Long userId) {

        List<PortfolioStock> stocks = repo.findByUserId(userId);

        double invested = 0;
        double current = 0;

        for (PortfolioStock ps : stocks) {

            invested += ps.getPrice() * ps.getQuantity();

            Map<String, Object> data = marketService.getStockPrice(ps.getSymbol());

            double currentPrice = ps.getPrice(); // fallback

            if (data != null && data.get("price") != null) {
                currentPrice = Double.parseDouble(data.get("price").toString());
            }

            current += currentPrice * ps.getQuantity();
        }

        Map<String, Double> result = new HashMap<>();
        result.put("invested", invested);
        result.put("current", current);
        result.put("profit", current - invested);

        return result;
    }
}