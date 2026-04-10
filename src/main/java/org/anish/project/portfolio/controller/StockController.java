package org.anish.project.portfolio.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/stocks")
public class StockController {

    @GetMapping
    public List<String> test() {
        return List.of("AAPL", "GOOG");
    }
}