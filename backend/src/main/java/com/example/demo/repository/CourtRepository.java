package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Court;
import com.example.demo.model.Game;

public interface CourtRepository extends JpaRepository<Court, Long> {
    List<Court> findByGame(Game game); 
    List<Court> findByAvailable(Boolean available);
    List<Court> findByPlayerAmount(Integer playerAmount);

    
}
