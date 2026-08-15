package com.example.demo.controller;

import com.example.demo.service.GooglePlacesService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/venues")
public class VenueDiscoveryController {

  private final GooglePlacesService googlePlacesService;

  public VenueDiscoveryController(
      GooglePlacesService googlePlacesService) {
    this.googlePlacesService = googlePlacesService;
  }

  @GetMapping("/nearby")
  public ResponseEntity<String> getNearbyVenues(
      @RequestParam double latitude,
      @RequestParam double longitude) throws Exception {
    return ResponseEntity.ok(
        googlePlacesService.findNearbyVenues(latitude, longitude).toString());
  }

  @GetMapping("/photo")
  public ResponseEntity<byte[]> getPhoto(
      @RequestParam String photoName) throws Exception {
    return googlePlacesService.getPhoto(photoName);
  }
}