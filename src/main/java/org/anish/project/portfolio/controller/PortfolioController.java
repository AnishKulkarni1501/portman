package org.anish.project.portfolio.controller;

import org.anish.project.portfolio.model.PortfolioStock;
import org.anish.project.portfolio.repository.PortfolioRepository;
import org.anish.project.portfolio.service.MarketServiceData;
import org.anish.project.portfolio.service.NotificationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/portfolio")
@CrossOrigin
public class PortfolioController {

    private final PortfolioRepository repo;
    private final MarketServiceData marketService;
    private final NotificationService notificationService;

    public PortfolioController(PortfolioRepository repo,
                               MarketServiceData marketService,
                               NotificationService notificationService) {
        this.repo = repo;
        this.marketService = marketService;
        this.notificationService = notificationService;
    }

    @PostMapping("/buy")
    public PortfolioStock buy(@RequestBody PortfolioStock stock) {

        // ✅ FIX: use stock, not ps
        Map<String, Object> data = marketService.getStockPrice(stock.getSymbol());

        double price = 100; // fallback

        // ✅ FIX: proper parsing
        if (data != null && data.get("price") != null) {
            price = Double.parseDouble(data.get("price").toString());
        } else {
            System.out.println("API failed, using fallback price");
        }

        stock.setPrice(price);
        PortfolioStock saved = repo.save(stock);

        try {
            notificationService.notifyUser(
                    stock.getUserId(),
                    "Bought " + stock.getQuantity() + " shares of " + stock.getSymbol()
            );
        } catch (Exception e) {
            System.out.println("Notification failed");
        }

        return saved;
    }

    @PostMapping("/sell")
    public String sell(@RequestBody PortfolioStock stock) {

        if (stock.getSymbol() == null || stock.getQuantity() <= 0) {
            return "Invalid request";
        }

        List<PortfolioStock> stocks = repo.findByUserId(stock.getUserId());

        for (PortfolioStock ps : stocks) {

            if (ps.getSymbol() != null &&
                    ps.getSymbol().equalsIgnoreCase(stock.getSymbol())) {

                if (ps.getQuantity() < stock.getQuantity()) {
                    return "Not enough shares";
                }

                ps.setQuantity(ps.getQuantity() - stock.getQuantity());

                if (ps.getQuantity() == 0) {
                    repo.delete(ps);
                } else {
                    repo.save(ps);
                }

                try {
                    notificationService.notifyUser(
                            stock.getUserId(),
                            "Sold " + stock.getQuantity() + " shares of " + stock.getSymbol()
                    );
                } catch (Exception e) {
                    System.out.println("Notification failed");
                }

                return "Sold successfully";
            }
        }

        return "Stock not found";
    }

    @GetMapping("/{userId}")
    public List<PortfolioStock> get(@PathVariable Long userId) {
        return repo.findByUserId(userId);
    }
}