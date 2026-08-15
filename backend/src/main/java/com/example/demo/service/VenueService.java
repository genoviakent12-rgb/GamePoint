package com.example.demo.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.model.Venue;
import com.example.demo.repository.VenueRepository;

@Service
public class VenueService {
  private final VenueRepository venueRepository; 

  public VenueService(
    VenueRepository venueRepository
  ) { 
    this.venueRepository = venueRepository; 
  }

  //finds all the venues
  public Iterable<Venue> findAllVenues() { 
    return venueRepository.findAll(); 
  }

  //gets venue by id
  public Optional<Venue> getVenueById(Long id) { 
    return venueRepository.findById(id); 
  }

  //adds a venue
  public Venue addVenue(Venue venue) {
    return venueRepository.save(venue);
  }

  //update the venue
  public Venue updateVenue(Long id, Venue updatedVenue) { 
    Optional<Venue> venueOptional = this.venueRepository.findById(id); 

    if(!venueOptional.isPresent()) { 
      return null;
    }

    Venue venueToUpdate = venueOptional.get(); 

    venueToUpdate.setName(updatedVenue.getName());
    venueToUpdate.setAddress(updatedVenue.getAddress());
    venueToUpdate.setPhone(updatedVenue.getPhone());
    venueToUpdate.setSport(updatedVenue.getSport());

    return venueRepository.save(venueToUpdate);
  }

  //delete venue
  public Venue deleteVenue(Long id) { 
    Optional<Venue> venueOptional = this.venueRepository.findById(id); 

    if(!venueOptional.isPresent()) { 
      return null;
    }

    Venue venueToDelete = venueOptional.get(); 
    venueRepository.delete(venueToDelete);
    return venueToDelete; 
  }

}



