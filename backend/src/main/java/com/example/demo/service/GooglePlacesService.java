package com.example.demo.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Locale;

@Service
public class GooglePlacesService {

  @Value("${google.places.api-key}")
  private String googleApiKey;

  private final HttpClient httpClient = HttpClient.newBuilder()
      .followRedirects(HttpClient.Redirect.NORMAL) // <-- follow the 302 to the actual image
      .build();
  private final ObjectMapper objectMapper = new ObjectMapper();

  public JsonNode findNearbyVenues(
      double latitude,
      double longitude) throws IOException, InterruptedException {

    String requestBody = String.format(
        Locale.US,
        """
            {
              "includedTypes": ["gym", "stadium"],
              "maxResultCount": 10,
              "rankPreference": "DISTANCE",
              "locationRestriction": {
                "circle": {
                  "center": {
                    "latitude": %f,
                    "longitude": %f
                  },
                  "radius": 10000.0
                }
              }
            }
            """,
        latitude,
        longitude);

    HttpRequest request = HttpRequest.newBuilder()
        .uri(URI.create(
            "https://places.googleapis.com/v1/places:searchNearby"))
        .header("Content-Type", "application/json")
        .header("X-Goog-Api-Key", googleApiKey)
        .header(
            "X-Goog-FieldMask",
            "places.id,"
                + "places.displayName,"
                + "places.formattedAddress,"
                + "places.location,"
                + "places.rating,"
                + "places.primaryType,"
                + "places.photos")
        .POST(HttpRequest.BodyPublishers.ofString(requestBody))
        .build();

    HttpResponse<String> response = httpClient.send(
        request,
        HttpResponse.BodyHandlers.ofString());

    if (response.statusCode() >= 400) {
      throw new RuntimeException(
          "Google Places failed: " + response.body());
    }

    return objectMapper.readTree(response.body());
  }

  public ResponseEntity<byte[]> getPhoto(String photoName)
    throws IOException, InterruptedException {

    String url =
        "https://places.googleapis.com/v1/"
        + photoName
        + "/media?maxWidthPx=600";

    HttpRequest request = HttpRequest.newBuilder()
        .uri(URI.create(url))
        .header("X-Goog-Api-Key", googleApiKey)
        .build();

    HttpResponse<byte[]> response = httpClient.send(
        request,
        HttpResponse.BodyHandlers.ofByteArray()
    );

    if (response.statusCode() >= 400) {
        throw new RuntimeException(
            "Google Photo failed: " + response.statusCode()
        );
    }

    return ResponseEntity
        .ok()
        .header(
            "Content-Type",
            response.headers()
                .firstValue("Content-Type")
                .orElse("image/jpeg")
        )
        .body(response.body());
}
}
