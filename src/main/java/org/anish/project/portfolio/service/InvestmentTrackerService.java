package org.anish.project.portfolio.service;

import org.anish.project.portfolio.model.PortfolioStock;
import org.anish.project.portfolio.repository.PortfolioRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InvestmentTrackerService {

    private final PortfolioRepository repo;

    public InvestmentTrackerService(PortfolioRepository repo) {
        this.repo = repo;
    }

    public List<PortfolioStock> track(Long userId) {
        return repo.findByUserId(userId);
    }
}