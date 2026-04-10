package org.anish.project.portfolio.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import org.anish.project.portfolio.model.Stock;
import org.anish.project.portfolio.repository.StockRepository;

@Service
public class StockService {

    @Autowired
    private StockRepository repo;

    public List<Stock> getAllStocks() {
        return repo.findAll();
    }

    public Stock saveStock(Stock stock) {
        return repo.save(stock);
    }
}