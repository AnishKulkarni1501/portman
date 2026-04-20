package org.anish.project.portfolio.service;

import org.anish.project.portfolio.model.PortfolioStock;
import org.anish.project.portfolio.repository.PortfolioRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class PerformanceService {

    private final PortfolioRepository repo;
    private final MarketServiceData market;

    public PerformanceService(PortfolioRepository repo,
                              MarketServiceData market) {
        this.repo = repo;
        this.market = market;
    }

    public Map<String, Double> analyze(Long userId) {

        List<PortfolioStock> stocks = repo.findByUserId(userId);

        if (stocks.isEmpty()) {
            return Map.of(
                    "best_performer", 0.0,
                    "worst_performer", 0.0
            );
        }

        double best = Double.NEGATIVE_INFINITY;
        double worst = Double.POSITIVE_INFINITY;

        for (PortfolioStock ps : stocks) {

            double buy = ps.getPrice();
            double current = buy; // fallback

            // ✅ SAFE API CALL
            Map<String, Object> data = market.getStockPrice(ps.getSymbol());

            if (data != null && data.get("price") != null) {
                current = Double.parseDouble(data.get("price").toString());
            }

            double change = (current - buy) / buy;

            best = Math.max(best, change);
            worst = Math.min(worst, change);
        }

        return Map.of(
                "best_performer", best,
                "worst_performer", worst
        );
    }
}