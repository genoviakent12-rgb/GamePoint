package com.example.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Court {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id; 

  private Integer court;

  private Integer playerAmount; 

  private Boolean available; 

  @ManyToOne
  @JoinColumn(name = "venue_id")
  private Venue venue; 
  
  @ManyToOne
  @JoinColumn(name = "game_id")
  private Game game; 
  
}
