package org.anish.project.portfolio.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.anish.project.portfolio.apifolder.ApiConfig;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class MarketServiceData {

    private final ApiConfig config;
    private final RestTemplate restTemplate;

    public MarketServiceData(ApiConfig config) {
        this.config = config;
        this.restTemplate = new RestTemplate();
    }

    public Map<String, Object> getStockPrice(String symbol) {
        try {
            String url = "https://finnhub.io/api/v1/quote?symbol="
                    + symbol + "&token=d7fh221r01qpjqqkpuhgd7fh221r01qpjqqkpui0";//relax its free 

            Map response = restTemplate.getForObject(url, Map.class);

            if (response == null) return null;

            return Map.of(
                    "price", response.get("c"),
                    "high", response.get("h"),
                    "low", response.get("l"),
                    "open", response.get("o"),
                    "prevClose", response.get("pc")
            );

        } catch (Exception e) {
            System.out.println("Stock API failed");
            return null;
        }
    }
    public List<Map<String, String>> getStockHistory(String symbol) {

        String url = config.getUrl()
                + "?function=TIME_SERIES_DAILY"
                + "&symbol=" + symbol
                + "&apikey=" + config.getKey();

        String response = restTemplate.getForObject(url, String.class);

        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response);
            JsonNode series = root.get("Time Series (Daily)");

            List<Map<String, String>> result = new ArrayList<>();

            Iterator<String> dates = series.fieldNames();

            while (dates.hasNext()) {
                String date = dates.next();
                JsonNode day = series.get(date);

                Map<String, String> data = new HashMap<>();
                data.put("date", date);
                data.put("price", day.get("4. close").asText());

                result.add(data);
            }

            return result;

        } catch (Exception e) {
            return List.of();
        }
    }
}