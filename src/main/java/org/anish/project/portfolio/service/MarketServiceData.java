package org.anish.project.portfolio.service;

import org.anish.project.portfolio.apifolder.ApiConfig;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MarketServiceData {

    private final ApiConfig config;
    private final RestTemplate restTemplate;

    private final Map<String, Map<String, Object>> cache = new HashMap<>();
    private final Map<String, Long> timestamps = new HashMap<>();

    public MarketServiceData(ApiConfig config) {
        this.config = config;
        this.restTemplate = new RestTemplate();
    }

    public Map<String, Object> getStockPrice(String symbol) {

        try {

            symbol = symbol.toUpperCase();
            long now = System.currentTimeMillis();

            // ✅ CACHE CHECK (5 min)
            if (cache.containsKey(symbol) &&
                    (now - timestamps.get(symbol)) < 300000) {
                return cache.get(symbol);
            }

            Map<String, Object> result;

            // 🇮🇳 INDIAN STOCKS → YAHOO FINANCE
            if (symbol.endsWith(".NS")) {

                String url = "https://query1.finance.yahoo.com/v8/finance/chart/"
                        + symbol + "?interval=1d&range=1d";

                HttpHeaders headers = new HttpHeaders();
                headers.set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36");
                headers.set("Accept", "application/json");
                headers.set("Accept-Language", "en-US,en;q=0.9");

                HttpEntity<String> entity = new HttpEntity<>(headers);

                ResponseEntity<Map> response = restTemplate.exchange(
                        url, HttpMethod.GET, entity, Map.class
                );

                Map<String, Object> res = response.getBody();
                if (res == null) return fallback();

                Map<String, Object> chart = (Map<String, Object>) res.get("chart");
                List<Object> resultList = (List<Object>) chart.get("result");

                if (resultList == null || resultList.isEmpty()) return fallback();

                Map<String, Object> r    = (Map<String, Object>) resultList.get(0);
                Map<String, Object> meta = (Map<String, Object>) r.get("meta");

                double price = Double.parseDouble(meta.get("regularMarketPrice").toString());
                double high  = Double.parseDouble(meta.get("regularMarketDayHigh").toString());
                double low   = Double.parseDouble(meta.get("regularMarketDayLow").toString());
                double prev  = Double.parseDouble(meta.get("chartPreviousClose").toString());
                double open  = meta.containsKey("regularMarketOpen")
                        ? Double.parseDouble(meta.get("regularMarketOpen").toString())
                        : price;

                result = Map.of(
                        "price",     price,
                        "open",      open,
                        "high",      high,
                        "low",       low,
                        "prevClose", prev,
                        "change",    price - prev
                );
            }

            // 🇺🇸 US STOCKS → FINNHUB
            else {

                String url = "https://finnhub.io/api/v1/quote?symbol="
                        + symbol + "&token=" + "d7fh221r01qpjqqkpuhgd7fh221r01qpjqqkpui0";

                Map<String, Object> res = restTemplate.getForObject(url, Map.class);

                if (res == null) return fallback();

                double price = Double.parseDouble(res.getOrDefault("c", 100).toString());
                double open  = Double.parseDouble(res.getOrDefault("o", 100).toString());
                double high  = Double.parseDouble(res.getOrDefault("h", 100).toString());
                double low   = Double.parseDouble(res.getOrDefault("l", 100).toString());
                double prev  = Double.parseDouble(res.getOrDefault("pc", 100).toString());

                result = Map.of(
                        "price",     price,
                        "open",      open,
                        "high",      high,
                        "low",       low,
                        "prevClose", prev,
                        "change",    price - prev
                );
            }

            // ✅ STORE IN CACHE
            cache.put(symbol, result);
            timestamps.put(symbol, now);

            return result;

        } catch (HttpClientErrorException.TooManyRequests e) {
            System.out.println("⚠️ Rate limit hit for " + symbol);
            return cache.getOrDefault(symbol, fallback());

        } catch (Exception e) {
            e.printStackTrace();
            return fallback();
        }
    }

    private Map<String, Object> fallback() {
        return Map.of(
                "price",     100.0,
                "open",      100.0,
                "high",      100.0,
                "low",       100.0,
                "prevClose", 100.0,
                "change",    0.0
        );
    }
}