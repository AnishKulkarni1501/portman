package org.anish.project.portfolio.repository;

import org.anish.project.portfolio.model.PortfolioStock;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PortfolioRepository extends JpaRepository<PortfolioStock, Long> {
    List<PortfolioStock> findByUserId(Long userId);
}