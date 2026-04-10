package org.anish.project.portfolio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.anish.project.portfolio.model.Stock;

public interface StockRepository extends JpaRepository<Stock, Long> {

}