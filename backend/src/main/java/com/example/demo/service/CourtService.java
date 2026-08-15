package com.example.demo.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.model.Court;
import com.example.demo.repository.CourtRepository;

@Service
public class CourtService {
  private final CourtRepository courtRepository; 

  public CourtService(
    CourtRepository courtRepository
  ) { 
    this.courtRepository = courtRepository; 
  }

  public Iterable<Court> findAllCourt() { 
    return courtRepository.findAll(); 
  }

  public Optional<Court> findCourtById(Long id) { 
    return courtRepository.findById(id); 
  }

  public Iterable<Court> findByPlayerAmount(Integer playerAmount) { 
    return courtRepository.findByPlayerAmount(playerAmount); 
  }

  public Court addCourt(Court court) { 
    return courtRepository.save(court); 
  }

  public Court deleteCourt(Long id) { 
    Optional<Court> courtOptional = this.courtRepository.findById(id); 

    if(!courtOptional.isPresent()) { 
      return null;
    }

    Court courtToDelete = courtOptional.get(); 
    courtRepository.delete(courtToDelete);
    return courtToDelete; 
  }
}
