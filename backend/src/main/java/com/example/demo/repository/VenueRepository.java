package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

import com.example.demo.model.Venue;

public interface VenueRepository extends JpaRepository <Venue, Long> {
  List<Venue> findByName(String name); 
  List<Venue> findBySport(String sport); 
  List<Venue> findByAddress(String address); 
  List<Venue> findByPricePerHour(Double pricePerHour);
  List<Venue> findByPricePerHourGreaterThan(Double pricePerHour); 
  List<Venue> findByPricePerHourLessThan(Double pricePerHour); 
  List<Venue> findByRating(Double rating); 
  List<Venue> findByRatingGreaterThan(Double rating); 
  List<Venue> findByRatingLessThan(Double rating); 
  List<Venue> findByAvailable(boolean available); 
}
