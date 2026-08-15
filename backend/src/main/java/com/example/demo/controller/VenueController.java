package com.example.demo.controller;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Venue;
import com.example.demo.service.VenueService;

@RestController
@RequestMapping("/api/venues")
public class VenueController {
  private final VenueService venueService;

  public VenueController(VenueService venueService) {
    this.venueService = venueService;
  }

  // Get all venues
  @GetMapping
  public Iterable<Venue> getAllVenues() {
    return venueService.findAllVenues();
  }

  // Get venue by id
  @GetMapping("/{id}")
  public ResponseEntity<Venue> getVenueById(@PathVariable Long id) {
    Optional<Venue> venue = venueService.getVenueById(id);
    return venue.map(ResponseEntity::ok)
        .orElseGet(() -> ResponseEntity.notFound().build());
  }

  // Add venue
  @PostMapping
  public Venue addVenue(@RequestBody Venue venue) {
    return venueService.addVenue(venue);
  }

  // Update venue
  @PutMapping("/{id}")
  public ResponseEntity<Venue> updateVenue(@PathVariable Long id, @RequestBody Venue venue) {
    Venue updated = venueService.updateVenue(id, venue);
    if (updated == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(updated);
  }

  // Delete venue
  @DeleteMapping("/{id}")
  public ResponseEntity<Venue> deleteVenue(@PathVariable Long id) {
    Venue deleted = venueService.deleteVenue(id);
    if (deleted == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(deleted);
  }
}