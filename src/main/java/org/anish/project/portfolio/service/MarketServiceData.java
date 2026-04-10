package org.anish.project.portfolio.service;

import org.anish.project.portfolio.apifolder.ApiConfig;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class MarketServiceData {

    private final ApiConfig config;
    private final RestTemplate restTemplate;

    public MarketServiceData(ApiConfig config) {
        this.config = config;
        this.restTemplate = new RestTemplate();
    }

    public String getStockPrice(String symbol) {

        String url = config.getUrl()
                + "?function=GLOBAL_QUOTE"
                + "&symbol=" + symbol
                + "&apikey=" + config.getKey();

        return restTemplate.getForObject(url, String.class);
    }
}